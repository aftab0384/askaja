import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  FormControl,
  Button,
  Modal,
  CircularProgress,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  Table,
  TableBody
} from '@mui/material';
import { IconCirclePlus, IconX, IconPencil, IconTrash } from '@tabler/icons-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { createAxiosInstance, cafeBackend } from 'utils/config';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
  borderRadius: '12px'
};

const columns = [
  { id: 'Id', label: 'Sr.No', align: 'center', minWidth: 40 },
  { id: 'category', label: 'Category', minWidth: 150, align: 'center' },
  { id: 'description', label: 'Description', minWidth: 150, align: 'center' },
  { id: 'createdat', label: 'CreatedAt', minWidth: 150, align: 'center' },
  { id: 'view', label: 'View', minWidth: 150, align: 'center' }
];

export const CategoryMaster = () => {
  const [categoryForm, setCategoryForm] = useState({
    categoryName: '',
    description: ''
  });
  const [allCategoryData, setAllCategoryData] = useState([]);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [catNameErr, setCatNameErr] = useState(false);
  const [catDesErr, setCatDesErr] = useState(false);
  const [catIdErr, setCatIdErr] = useState(false);
  const [open, setOpen] = useState(false);
  const [updateObj, setUpdateObj] = useState({});
  const [addUpdateModal, setAddUpdateModal] = useState({
    updateModal: false,
    addModal: true
  });
  const [refreshPage, setRefreshPage] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddModal = () => {
    setAddUpdateModal({ addModal: true, updateModal: false });
    handleOpen();
  };

  const handleUpdateModal = (item) => {
    setUpdateObj(item);
    setAddUpdateModal({ addModal: false, updateModal: true });
    handleOpen();
  };
  const [isMdlOpen, setIsMdlOpen] = useState(false);

  const handleMdlOpen = (item) => {
    setUpdateObj(item);
    setIsMdlOpen(true);
  };
  const handleMdlClose = () => setIsMdlOpen(false);

  useEffect(() => {
    setRefreshPage(false);
    const axiosInstance = createAxiosInstance();
    axiosInstance
      .post(`${cafeBackend}/app/v1/category/getAllCategory`)
      .then((res) => {
        setAllCategoryData(res?.data?.result);
      })
      .catch((err) => console.log('Api Error', err));
     
  }, [refreshPage]);

  const ClearField = () => {
    setCategoryForm({ categoryName: '', description: '' });
  };
  const ClearUpdateField = () => {
    setUpdateObj({ categoryId: '', categoryName: '', description: '' });
  };

  const handelAddCategory = () => {
    if (categoryForm.categoryName !== '') {
      setIsButtonLoading(true);
      const body = {
        categoryName: categoryForm.categoryName.trim(),
        description: categoryForm.description.trim()
      };
      axios
        .post(`${cafeBackend}/app/v1/category/addCategory`, body)
        .then((res) => {
          setIsButtonLoading(false);
          toast.success(res.data.result || 'Category Added Successfully');
          setRefreshPage(true);
          ClearField();
          handleClose();
        })
        .catch((err) => {
          setIsButtonLoading(false);
          console.log('Api error', err);
          toast.error('Error');
          handleClose();
        });
      setCatNameErr(false);
    } else {
      setIsButtonLoading(false);
      setCatNameErr(true);
    }
  };

  const handleUpdateCategory = () => {
    // start api then if condition
    if (updateObj.categoryId != '' && updateObj.categoryName != '' && updateObj.description != '') {
      const body = {
        categoryId: updateObj.categoryId,
        categoryName: updateObj.categoryName,
        description: updateObj.description
      };
      console.log(body);

      const axiosInstance = createAxiosInstance();
      setIsButtonLoading(true);
      axiosInstance
        .post(`${cafeBackend}/app/v1/category/updateCategory`, body)
        .then((res) => {
          toast.success('Details updated Successfully');
          setIsButtonLoading(false);
          setRefreshPage(true);
          window.alert(`${res.data.result}`);
          //handleClose();
        })
        .catch((err) => {
          toast.success('Failed to updated details' || err);
          setIsButtonLoading(false);
          handleClose();
        });
    } else {
      setIsButtonLoading(false);
      setCatNameErr(true);
      setCatDesErr(true);
    }
  };
  const handleDeleteCategory = () => {
    const categoryId = updateObj.categoryId;
    console.log('in delete api');

    console.log(updateObj.categoryId);

    const axiosInstance = createAxiosInstance();
    axiosInstance
      .post(`${cafeBackend}/app/v1/category/deleteCategory/${categoryId}`)
      .then((res) => {
        toast.success('category deleted Successfully');
        handleMdlClose();
        setRefreshPage(true);
      })
      .catch((err) => {
        toast.success('Failed to delete details' || err);
        handleMdlClose();
      });
  };
  const styleConfirm = {
    position: 'absolute',
    top: '55%',
    left: '55%',
    transform: 'translate(-50%, -50%)',
    p: 4
  };
  return (
    <>
      <div>
        <div className="bg-white p-10 flex flex-col gap-10">
          <div className="relative">
            <h1 className="text-3xl text-center font-semibold">Category Master</h1>
            <p className="absolute top-2 right-2">
              <button onClick={handleAddModal}>
                <IconCirclePlus />
              </button>
            </p>
          </div>
          <div>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: 500 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell key={column.id} style={{ minWidth: column.minWidth }} className="bg-gray-300">
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allCategoryData.map((item, index) => (
                      <TableRow key={item.categoryId}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell className="font-medium">{item.categoryName}</TableCell>
                        <TableCell className="font-medium">{item.description}</TableCell>
                        <TableCell className="font-medium">{item.createdAt}</TableCell>
                        <TableCell className="font-medium">
                          <button onClick={() => handleUpdateModal(item)} className='pr-5'>
                            <IconPencil className="text-blue-500" />
                          </button>
                          <button onClick={() => handleMdlOpen(item)}>
                            <IconTrash className="text-red-500" />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </div>
        </div>
      </div>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div>
            <Toaster />
          </div>
          <div className="relative py-4 flex flex-col gap-5">
            <button onClick={handleClose} className="absolute top-0 right-0 text-black rounded-full p-1 hover:bg-gray-700 hover:text-white">
              <IconX />
            </button>
            <div className="text-center">
              <h1 className="text-2xl font-medium">
                {addUpdateModal.addModal && !addUpdateModal.updateModal ? 'Add Category' : 'Update Category'}
              </h1>
            </div>

            {/* Add Category Form */}
            {addUpdateModal.addModal && !addUpdateModal.updateModal && (
              <div className="flex flex-col gap-5">
                <FormControl fullWidth>
                  <TextField
                    label="Category Name"
                    type="text"
                    variant="outlined"
                    value={categoryForm.categoryName}
                    onChange={(e) => setCategoryForm({ ...categoryForm, categoryName: e.target.value })}
                  />
                  {catNameErr && <p className="text-red-500 text-xs ml-2">Category name is required</p>}
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    label="Description"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={categoryForm.description}
                    onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                  />
                  {catDesErr && <p className="text-red-500 text-xs ml-2">Description is required</p>}
                </FormControl>

                <div className="flex justify-center gap-8">
                  <Button className="bg-[#49c401] text-white hover:bg-green-500" onClick={handelAddCategory} disabled={isButtonLoading}>
                    {isButtonLoading ? <CircularProgress size={24} color="inherit" /> : 'Add'}
                  </Button>
                  <Button variant="outlined" color="error" onClick={ClearField}>
                    Clear
                  </Button>
                </div>
              </div>
            )}

            {/* Update Category Form */}
            {/* Uncomment and modify this section for update functionality */}
            {!addUpdateModal.addModal && addUpdateModal.updateModal && (
              <div className="flex flex-col gap-5">
                <FormControl fullWidth>
                  <TextField
                    label="Category Name"
                    type="text"
                    variant="outlined"
                    value={updateObj.categoryName}
                    onChange={(e) => setUpdateObj({ ...updateObj, categoryName: e.target.value })}
                  />
                  {catNameErr && <p className="text-red-500 text-xs ml-2">Category name is required</p>}
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    label="Description"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={updateObj.description}
                    onChange={(e) => setUpdateObj({ ...updateObj, description: e.target.value })}
                  />
                  {catDesErr && <p className="text-red-500 text-xs ml-2">Description is required</p>}
                </FormControl>

                <div className="flex justify-center gap-8">
                  <Button className="bg-blue-500 text-white hover:bg-blue-700" onClick={handleUpdateCategory} disabled={isButtonLoading}>
                    {isButtonLoading ? <CircularProgress size={24} color="inherit" /> : 'Update'}
                  </Button>
                  <Button variant="outlined" color="error" onClick={ClearUpdateField}>
                    Clear
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Box>
      </Modal>

      <Modal open={isMdlOpen} onClose={handleMdlClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={styleConfirm} className=" w-96 max-lg:w-96 max-md:w-56 h-96 max-lg:h-60 max-md:h-56  p-4">
          <div className=" max-lg:w-full flex flex-col gap-5 bg-white my-4 p-4 rounded-xl ">
            <p className="font-semibold text-center text-lg">Are You Sure to delete?</p>
            <div className="flex justify-around pb-5">
              <button className="bg-blue-700 text-white py-1 px-2 rounded-md hover:bg-blue-500" onClick={handleDeleteCategory}>
                Yes
              </button>
              <button className="border border-red-700 text-red-700 py-1 px-2 rounded-md hover:bg-slate-50" onClick={handleMdlClose}>
                No
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

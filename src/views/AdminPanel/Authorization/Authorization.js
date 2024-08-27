import React, { useState } from 'react';
import {
  Modal,
  Box,
  FormControl,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  Table,
  TableBody
} from '@mui/material';
import { IconCirclePlus, IconX, IconPencil, IconTrash } from '@tabler/icons-react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import { } from '@tabler/icons';
const AccessDashBoard = [
  { id: 1, value: 'ADMIN', option: 'ADMIN' },
  { id: 2, value: 'OPERATION', option: 'OPERATION' },
  { id: 3, value: 'BILLING', option: 'BILLING' },
  { id: 4, value: 'MARKETING', option: 'MARKETING' }
];
// style for modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',

  p: 4
};
const columns = [
  { id: 'Id', label: 'ID', align: 'center', minWidth: 40 },
  {
    id: 'username',
    label: 'User Name',
    minWidth: 150,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'password',
    label: 'Password',
    minWidth: 150,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'role',
    label: 'Role',
    minWidth: 150,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'view',
    label: 'View',
    minWidth: 150,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  }
];
const users = [
  {
    id: 1,
    username: 'raj kumar',
    password: 'password123',
    role: 'ADMIN'
  },
  {
    id: 2,
    username: 'sita sharma',
    password: 'password456',
    role: 'OPERATION'
  },
  {
    id: 3,
    username: 'amit patel',
    password: 'password789',
    role: 'MARKETING'
  },
  {
    id: 4,
    username: 'anita mehta',
    password: 'password101',
    role: 'BILLING'
  },
  {
    id: 5,
    username: 'vikas verma',
    password: 'password102',
    role: 'ADMIN'
  }
];

export const Authorization = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSelectedPass, setShowSelectedPass] = useState(-1);
  const [addUpdateModal, setAddUpdateModal] = useState({
    updateModal: false,
    addModal: true
  });
  const [updateObj, setUpdateObj] = useState({});
  const [loginForm, setLoginForm] = useState({ username: '', password: '', role: '' });
  const handleAddModal = () => {
    setAddUpdateModal({ ...addUpdateModal, addModal: true, updateModal: false });
    handleOpen();
  };
  const deleteUser = () => {
    const deleteBool = window.confirm('Do you want to delete the User ?');
    if (deleteBool) {
      console.log(deleteBool); // API call : --
    }
  };
  const handleUpdateModal = (item) => {
    setUpdateObj(item);
    setAddUpdateModal({ ...addUpdateModal, addModal: false, updateModal: true });
    handleOpen();
  };
  return (
    <>
      <div>
        <div className="bg-white p-10 flex flex-col gap-10">
          <div className="relative">
            <h1 className="text-3xl text-center font-semibold">Dashboard Access</h1>
            <p className="absolute top-2 right-2 max-md:right-0">
              <button onClick={() => handleAddModal()}>
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
                    {users.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell className="font-medium">{item.username}</TableCell>
                        <TableCell className="font-medium">
                          {showSelectedPass == item.id ? (
                            <button onClick={() => setShowSelectedPass(-1)}>
                              <VisibilityOff />
                            </button>
                          ) : (
                            <button onClick={() => setShowSelectedPass(item.id)}>
                              {' '}
                              <Visibility />
                            </button>
                          )}{' '}
                          {showSelectedPass == item.id ? item.password : '**********'}{' '}
                        </TableCell>
                        <TableCell className="font-medium">{item.role}</TableCell>
                        <TableCell className="font-medium flex gap-5">
                          <button onClick={() => handleUpdateModal(item)}>
                            <IconPencil className="text-blue-500" />
                          </button>
                          <button onClick={() => deleteUser()}>
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
        <Box sx={style} className="rounded-xl">
          <div className="relative py-4 flex flex-col gap-5">
            <p className="absolute top-0 right-0">
              <button onClick={() => handleClose()} className="text-black rounded-full p-1 hover:bg-gray-700 hover:text-white">
                <IconX />
              </button>
            </p>
            <div className="text-center">
              <h1 className="text-2xl font-medium">{addUpdateModal.addModal && !addUpdateModal.updateModal ? 'Add User' : 'Update'}</h1>
            </div>
            {/* ADD */}
            {addUpdateModal.addModal && !addUpdateModal.updateModal && (
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-5">
                  <div>
                    <FormControl fullWidth>
                      <InputLabel id="vendor_id">Select Role</InputLabel>
                      <Select
                        labelId="vendor_id"
                        id="demo-simple-select"
                        label="Select Role"
                        value={loginForm.role}
                        onChange={(e) => setLoginForm({ ...loginForm, role: e.target.value })}
                      >
                        {AccessDashBoard.map((item) => {
                          return (
                            <MenuItem key={item.id} value={item.value}>
                              {item.option}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <FormControl fullWidth>
                      <TextField
                        type="text"
                        id="demo-simple-seect"
                        label="User name / Email."
                        value={loginForm.username}
                        onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                      />
                    </FormControl>
                  </div>
                  <div>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword((show) => !show)} edge="end">
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        required
                        autoComplete=""
                      />
                    </FormControl>
                  </div>
                </div>
                <div className="text-center">
                  <button className="text-white bg-blue-700 p-2 rounded text-lg">Provide Access</button>
                </div>
              </div>
            )}
            {/* update */}
            {!addUpdateModal.addModal && addUpdateModal.updateModal && (
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-5">
                  <div>
                    <FormControl fullWidth>
                      <InputLabel id="vendor_id">Select Role</InputLabel>
                      <Select
                        labelId="vendor_id"
                        id="demo-simple-select"
                        label="Select Role"
                        value={updateObj.role}
                        onChange={(e) => setUpdateObj({ ...updateObj, role: e.target.value })}
                      >
                        {AccessDashBoard.map((item) => {
                          return (
                            <MenuItem key={item.id} value={item.value}>
                              {item.option}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <FormControl fullWidth>
                      <TextField
                        type="text"
                        id="demo-simple-seect"
                        label="User name / Email."
                        value={updateObj.username}
                        onChange={(e) => setUpdateObj({ ...updateObj, username: e.target.value })}
                      />
                    </FormControl>
                  </div>
                  <div>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword((show) => !show)} edge="end">
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                        value={updateObj.password}
                        onChange={(e) => setUpdateObj({ ...updateObj, password: e.target.value })}
                        required
                        autoComplete=""
                      />
                    </FormControl>
                  </div>
                </div>
                <div className="text-center">
                  <button className="text-white bg-blue-700 p-2 rounded text-lg">update Access</button>
                </div>
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
};

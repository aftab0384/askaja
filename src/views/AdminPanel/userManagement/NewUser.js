import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  FormControl,
  Button,
  Modal,
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  Pagination,
  TextareaAutosize
} from '@mui/material';

import { IconEdit, IconX, IconAdjustmentsHorizontal } from '@tabler/icons-react';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  p: 4
};
const columns = [
  { id: 'userId', label: 'User ID', minWidth: 80 },
  { id: 'creationdate', label: 'Creation Date', minWidth: 150 },
  { id: 'username', label: 'Name', minWidth: 150 },
  { id: 'gender', label: 'Gender', minWidth: 120 },
  { id: 'phno', label: 'Phone No.', minWidth: 160 },
  { id: 'email', label: 'Email', minWidth: 120 },
  { id: 'Address', label: 'Address', minWidth: 200 },
  { id: 'remarks', label: 'Remarks', minWidth: 200 },
  { id: 'edit', label: 'Update', minWidth: 80 }
];
const obj = [
  {
    username: 'john_doe',
    phno: '555-5678',
    gender: 'Male',
    email: 'john.doe@example.com',
    address: '456 Oak St, Springfield, IL, 62704',
    time: '2:00 PM',
    date: '2024-06-05',
    remarks: 'John is scheduled for a follow-up appointment.',
    edit: 'Update',
    activestatus: true
  },
  {
    username: 'jane_doe',
    phno: '555-8765',
    gender: 'Female',
    email: 'jane.doe@example.com',
    address: '789 Pine St, Springfield, IL, 62704',
    time: '11:00 AM',
    date: '2024-06-06',
    remarks: 'Jane is a new patient.',
    edit: 'Update',
    activestatus: false
  },
  {
    username: 'sam_smith',
    phno: '555-4321',
    gender: 'Male',
    email: 'sam.smith@example.com',
    address: '321 Birch St, Springfield, IL, 62704',
    time: '9:30 AM',
    date: '2024-06-07',
    remarks: 'Sam needs to reschedule his appointment.',
    edit: 'Update',
    activestatus: true
  },
  {
    username: 'emily_jones',
    phno: '555-6789',
    gender: 'Female',
    email: 'emily.jones@example.com',
    address: '123 Elm St, Springfield, IL, 62704',
    time: '3:00 PM',
    date: '2024-06-08',
    remarks: 'Emily is coming for her first visit.',
    edit: 'Update',
    activestatus: true
  },
  {
    username: 'michael_brown',
    phno: '555-9876',
    gender: 'Male',
    email: 'michael.brown@example.com',
    address: '234 Cedar St, Springfield, IL, 62704',
    time: '10:00 AM',
    date: '2024-06-09',
    remarks: 'Michael has a routine check-up.',
    edit: 'Update',
    activestatus: true
  },
  {
    username: 'lisa_white',
    phno: '555-8765',
    gender: 'Female',
    email: 'lisa.white@example.com',
    address: '345 Pine St, Springfield, IL, 62704',
    time: '1:00 PM',
    date: '2024-06-10',
    remarks: 'Lisa is scheduled for a consultation.',
    edit: 'Update',
    activestatus: false
  },
  {
    username: 'robert_johnson',
    phno: '555-2345',
    gender: 'Male',
    email: 'robert.johnson@example.com',
    address: '456 Maple St, Springfield, IL, 62704',
    time: '4:00 PM',
    date: '2024-06-11',
    remarks: 'Robert has a follow-up appointment.',
    edit: 'Update',
    activestatus: true
  },
  {
    username: 'mary_wilson',
    phno: '555-3456',
    gender: 'Female',
    email: 'mary.wilson@example.com',
    address: '567 Willow St, Springfield, IL, 62704',
    time: '9:00 AM',
    date: '2024-06-12',
    remarks: 'Mary is a returning patient.',
    edit: 'Update',
    activestatus: true
  },
  {
    username: 'david_miller',
    phno: '555-4567',
    gender: 'Male',
    email: 'david.miller@example.com',
    address: '678 Walnut St, Springfield, IL, 62704',
    time: '5:00 PM',
    date: '2024-06-13',
    remarks: 'David has an urgent appointment.',
    edit: 'Update',
    activestatus: true
  },
  {
    username: 'susan_davis',
    phno: '555-5678',
    gender: 'Female',
    email: 'susan.davis@example.com',
    address: '789 Birch St, Springfield, IL, 62704',
    time: '8:00 AM',
    date: '2024-06-14',
    remarks: 'Susan is coming for a follow-up.',
    edit: 'Update',
    activestatus: false
  }
];

export const NewUser = () => {
  const [updateOpen, setUpdateOpen] = useState(false);
  const handleOpen = () => {
    // setUpdateObj(item);
    setUpdateOpen(true);
  };
  const handleClose = () => {
    // setUpdateObj(item);
    setUpdateOpen(false);
  };

  return (
    <>
      <div className='flex flex-col gap-5'>
        <div className='flex gap-5'>
          <FormControl fullWidth>
            <TextField label="Name" />
          </FormControl>
          <FormControl fullWidth>
            <TextField label="Phone No." />
          </FormControl>
        </div>

        <div>
          <div>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: 500 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead className="bg-gray-300">
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                          className="bg-gray-200 font-semibold"
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {obj.map((item, i) => {
                      return (
                        <TableRow key={i}>
                          <TableCell className="font-medium">{i + 1}</TableCell>
                          <TableCell className="font-medium">{'2024-06-04'}</TableCell>
                          <TableCell className="font-medium uppercase">{item.username}</TableCell>
                          <TableCell className="font-medium">{item.gender}</TableCell>
                          <TableCell className="font-medium">{item.phno}</TableCell>
                          <TableCell className="font-medium">{item.email}</TableCell>
                          <TableCell className="font-medium">{item.address}</TableCell>
                          <TableCell className="font-medium">
                            <textarea
                              className="bg-gray-200 rounded-sm p-1 text-center w-full"
                              defaultValue={item.remarks ? item.remarks : '-------'}
                            ></textarea>
                          </TableCell>
                          <TableCell>
                            <button onClick={() => handleOpen()}>
                              <IconEdit className=" text-blue-500" />
                            </button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            <div className="flex  justify-center">
              {/* <Stack spacing={2}>
              <Pagination count={totalPages} page={currentPage} onChange={handleChange} />
            </Stack> */}
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={updateOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className=""
      >
        <Box sx={style} className=" flex justify-center items-center ">
          <div className="bg-white p-4 flex flex-col gap-3 rounded-xl w-96">
            <div className="flex justify-between ">
              <p className="text-xl font-semibold">User Message</p>
              <button onClick={() => handleClose()} className="hover:bg-gray-200 rounded-full p-1">
                <IconX />
              </button>
            </div>
            <div>
              <p>Name : Neel Sir (update)</p>
            </div>
            <div>
              <p>Phone : 7860519627 (update)</p>
            </div>
            <div>
              <FormControl fullWidth>
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={7}
                  className="border-gray-500 bg-gray-300 outline-none p-2 rounded"
                />
              </FormControl>
            </div>
            <div>
              <button onClick={handleClose} className="text-lg text-white bg-[#49c401] w-full rounded-lg">
                Save Message
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

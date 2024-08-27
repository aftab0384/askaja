import { useState, useEffect } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
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
  Pagination,
  Stack
} from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import { IconAdjustmentsHorizontal } from '@tabler/icons-react';
import axios from 'axios';
import { BackendUrl } from 'utils/config';

const columns = [
  { id: 'user_id', label: 'S.R No.', align: 'center', minWidth: 100 },
  { id: 'user_name', label: 'User Name', align: 'center', minWidth: 150 },
  {
    id: 'gender',
    label: 'Gender',
    minWidth: 80,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'mobile',
    label: 'Mobile',
    minWidth: 120,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'email',
    label: 'Email',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'home_location_postal_code',
    label: 'Home Location Postal Code',
    minWidth: 200,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'home_location_city',
    label: 'Home Location City',
    minWidth: 200,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'home_location_state',
    label: 'Home Location State',
    minWidth: 200,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'home_location_addressline1',
    label: 'Home Location Addressline',
    minWidth: 200,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'office_location_postal_code',
    label: 'Office Location Postal Code',
    minWidth: 200,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'office_location_city',
    label: 'Office Location City',
    minWidth: 200,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'office_location_state',
    label: 'Office Location State',
    minWidth: 200,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'office_location_addressline1',
    label: 'Office Location Addressline1',
    minWidth: 200,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  }
];
export const AllUser = () => {
  const [userData, setUserData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [suserName, setSuserName] = useState('');
  const [suserNo, setSuserNo] = useState('');
  // const [suserEmail, setSuserEmail] = useState('');

  // update state

  useEffect(() => {
    fetch(`${BackendUrl}/app/v1/user/getAllusers`)
      .then((res) => res.json())
      .then((data) => setUserData(data.users))
      .catch((e) => {
        console.log('Api fail error', e);
        toast.error('Api error');
      });
  }, []);
  useEffect(() => {
    let res = userData;
    // if (suserEmail != '') {
    //   res = res.filter((item) => String(item.email).includes(suserEmail));
    // }
    if (suserName != '') {
      res = res.filter((item) => String(item.user_name).toLowerCase()?.includes(String(suserName).toLowerCase()));
    }
    if (suserNo.length > 1) {
      res = res.filter((item) => String(item.mobile).toLowerCase()?.includes(suserNo));
    }
    setFilterData(res);
  }, [userData, suserName, suserNo]);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filterData.length / itemsPerPage);

  const displayItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filterData.slice(startIndex, endIndex);
  };
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <div>
        <Toaster />
      </div>
      <div className=" flex flex-col gap-5 bg-white p-8 max-lg:p-4 max-lg:gap-5 rounded-xl relative">
        <div>
          <p className="text-3xl text-gray-600 text-center">All User Details</p>
        </div>
        {/* filter field */}
        <div>
          <div className="flex items-center gap-5">
            <span className="text-[#49C401]">
              <IconAdjustmentsHorizontal />
            </span>
            <FormControl fullWidth>
              <TextField label="Name" className="" onChange={(e) => setSuserName(e.target.value)} value={suserName} />
            </FormControl>
            <FormControl fullWidth>
              <TextField label="Number" type="number" className="" onChange={(e) => setSuserNo(e.target.value)} value={suserNo} />
            </FormControl>
            {/* <FormControl fullWidth>
              <TextField label="Email" className="" onChange={(e) => setSuserEmail(e.target.value)} value={suserEmail} />
            </FormControl> */}
          </div>
        </div>

        <div>
          <div>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: 500 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead className="bg-gray-300">
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell key={column.id} style={{ minWidth: column.minWidth }} className="uppercase font-semibold bg-gray-300">
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {displayItems()?.map((item, i) => {
                      return (
                        <TableRow key={i} hover>
                          <TableCell className="font-medium">{i + 1}</TableCell>
                          <TableCell className="font-medium uppercase">{item.user_name || 'NA'}</TableCell>
                          <TableCell className="font-medium">{item.gender || 'NA'}</TableCell>
                          <TableCell className="font-medium">{item.mobile || 'NA'}</TableCell>
                          <TableCell className="font-medium">{item.email || 'NA'}</TableCell>
                          <TableCell className="font-medium">{item.home_location_postal_code || 'NA'}</TableCell>
                          <TableCell className="font-medium">{item.home_location_city || 'NA'}</TableCell>
                          <TableCell className="font-medium">{item.home_location_state || 'NA'}</TableCell>
                          <TableCell className="font-medium uppercase">{item.home_location_addressline1 || 'NA'}</TableCell>
                          <TableCell className="font-medium">{item.office_location_postal_code || 'NA'}</TableCell>
                          <TableCell className="font-medium">{item.office_location_city || 'NA'}</TableCell>
                          <TableCell className="font-medium">{item.office_location_state || 'NA'}</TableCell>
                          <TableCell className="font-medium uppercase">{item.office_location_addressline1 || 'NA'}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            <div className="flex  justify-center">
              <Stack spacing={2}>
                <Pagination count={totalPages} page={currentPage} onChange={handleChange} />
              </Stack>{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* update api */
//  <Modal open={updateOpen} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
//         <Box sx={style} className=" w-full max-lg:h-screen max-lg:w-screen p-4 overflow-y-scroll">
//           <div>
//             <Toaster />
//           </div>
//           <div className=" max-lg:w-full flex flex-col gap-1 bg-white my-4 p-4 rounded-xl">
//             <div className="flex justify-between pb-5">
//               <p className="text-xl font-bold">Update User</p>
//               <button onClick={handleClose} className="">
//                 <IconX />
//               </button>
//             </div>
//             <>
//               <div>
//                 <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 max-lg:gap-7 gap-10">
//                   <div className="w-full">
//                     <FormControl fullWidth>
//                       <TextField
//                         fullWidth
//                         id="outlined-basic"
//                         label="User ID"
//                         variant="outlined"
//                         disabled={true}
//                         value={updateObj.user_id}
//                       />
//                     </FormControl>
//                   </div>
//                   <div className="w-full">
//                     <FormControl fullWidth>
//                       <TextField
//                         fullWidth
//                         id="outlined-basic"
//                         type="text"
//                         label="User Name"
//                         variant="outlined"
//                         required
//                         value={updateObj.user_name}
//                         onChange={(e) => setUpdateObj({ ...updateObj, user_name: e.target.value })}
//                       />
//                     </FormControl>
//                     {userNameErr && <p className="text-red-400 p-1 ml-2">User name error</p>}
//                   </div>
//                   <div className="w-full">
//                     <FormControl fullWidth>
//                       <TextField
//                         id="outlined-basic"
//                         label="Mobile number"
//                         required={true}
//                         type="tel"
//                         inputProps={{ maxLength: 10, minLength: 10 }}
//                         value={updateObj.mobile}
//                         onChange={(e) => setUpdateObj({ ...updateObj, mobile: e.target.value })}
//                       />
//                     </FormControl>
//                     {/* check */}
//                     {userMobileErr && <p className="text-red-400 p-1 ml-2">mobile number error</p>}
//                   </div>
//                   <div className="w-full">
//                     <FormControl fullWidth>
//                       <TextField
//                         id="outlined-basic"
//                         fullWidth
//                         label="Email"
//                         type="email"
//                         variant="outlined"
//                         required={true}
//                         value={updateObj.email}
//                         onChange={(e) => setUpdateObj({ ...updateObj, email: e.target.value })}
//                       />
//                     </FormControl>
//                     {userEmailErr && <p className="text-red-400 p-1 ml-2">Email error</p>}
//                   </div>
//                   <div className="w-full">
//                     <FormControl fullWidth>
//                       <InputLabel id="gender">Gender</InputLabel>
//                       <Select
//                         required={true}
//                         labelId="gender"
//                         id="demo-simple-st"
//                         value={updateObj.gender}
//                         label="Gender"
//                         onChange={(e) => setUpdateObj({ ...updateObj, gender: e.target.value })}
//                       >
//                         <MenuItem value="Male">Male</MenuItem>
//                         <MenuItem value="Female">Female</MenuItem>
//                       </Select>
//                     </FormControl>
//                     {userGenderErr && <p className="text-red-400 p-1 ml-2">Gender error</p>}
//                   </div>
//                   <div className="w-full">
//                     <FormControl fullWidth>
//                       <TextField
//                         id="outlined-basic"
//                         type="text"
//                         label="Home location postal code"
//                         variant="outlined"
//                         value={updateObj.home_location_postal_code}
//                         onChange={(e) => setUpdateObj({ ...updateObj, home_location_postal_code: e.target.value })}
//                         required={true}
//                       />
//                     </FormControl>
//                     {homePostalCodeErr && <p className="text-red-400 p-1 ml-2">Home location postal code error</p>}
//                   </div>
//                   <div className="w-full">
//                     <FormControl fullWidth>
//                       <TextField
//                         id="outlined-basic"
//                         type="text"
//                         label="Home location state"
//                         variant="outlined"
//                         value={updateObj.home_location_state}
//                         onChange={(e) => setUpdateObj({ ...updateObj, home_location_state: e.target.value })}
//                         required={true}
//                       />
//                     </FormControl>
//                     {homeStateErr && <p className="text-red-400 p-1 ml-2">Home location state error</p>}
//                   </div>
//                   <div className="w-full">
//                     <FormControl fullWidth>
//                       <TextField
//                         id="outlined-basic"
//                         type="text"
//                         label="Home location city"
//                         variant="outlined"
//                         value={updateObj.home_location_city}
//                         onChange={(e) => setUpdateObj({ ...updateObj, home_location_city: e.target.value })}
//                         required={true}
//                       />
//                     </FormControl>
//                     {homeCityErr && <p className="text-red-400 p-1 ml-2">Home location city error</p>}
//                   </div>
//                   <div className="w-full">
//                     <FormControl fullWidth>
//                       <TextField
//                         id="outlined-basic"
//                         type="text"
//                         label="Home location address line"
//                         variant="outlined"
//                         value={updateObj.home_location_addressline1}
//                         onChange={(e) => setUpdateObj({ ...updateObj, home_location_addressline1: e.target.value })}
//                         required={true}
//                       />
//                     </FormControl>
//                     {homeAddressErr && <p className="text-red-400 p-1 ml-2">Home location address line error</p>}
//                   </div>
//                   <div className="w-full">
//                     <FormControl fullWidth>
//                       <TextField
//                         id="outlined-basic"
//                         type="text"
//                         label="Office location postal code"
//                         variant="outlined"
//                         value={updateObj.office_location_postal_code}
//                         onChange={(e) => setUpdateObj({ ...updateObj, office_location_postal_code: e.target.value })}
//                         required={true}
//                       />
//                     </FormControl>
//                     {officePostalCodeErr && <p className="text-red-400 p-1 ml-2">Office location postal code error</p>}
//                   </div>{' '}
//                   <div className="w-full">
//                     <FormControl fullWidth>
//                       <TextField
//                         id="outlined-basic"
//                         type="text"
//                         label="Office location state"
//                         variant="outlined"
//                         value={updateObj.office_location_state}
//                         onChange={(e) => setUpdateObj({ ...updateObj, office_location_state: e.target.value })}
//                         required={true}
//                       />
//                     </FormControl>
//                     {officeStateErr && <p className="text-red-400 p-1 ml-2">Office location state error</p>}
//                   </div>
//                   <div className="w-full">
//                     <FormControl fullWidth>
//                       <TextField
//                         id="outlined-basic"
//                         type="text"
//                         label="Office location city"
//                         variant="outlined"
//                         value={updateObj.office_location_city}
//                         onChange={(e) => setUpdateObj({ ...updateObj, office_location_city: e.target.value })}
//                         required={true}
//                       />
//                     </FormControl>
//                     {officeCityErr && <p className="text-red-400 p-1 ml-2">Office location city error</p>}
//                   </div>
//                   <div className="w-full">
//                     <FormControl fullWidth>
//                       <TextField
//                         id="outlined-basic"
//                         type="text"
//                         label="Office location address line"
//                         variant="outlined"
//                         value={updateObj.office_location_addressline1}
//                         onChange={(e) => setUpdateObj({ ...updateObj, office_location_addressline1: e.target.value })}
//                         required={true}
//                       />
//                     </FormControl>
//                     {officeAddressErr && <p className="text-red-400 p-1 ml-2">Office location address line error</p>}
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-2">
//                 <div className="flex gap-10 justify-between mb-3">
//                   <Button variant="contained" className={'bg-blue-700'} onClick={updateUser}>
//                     update User
//                   </Button>
//                   <Button variant="outlined" color="error">
//                     Cancel
//                   </Button>
//                 </div>
//               </div>
//             </>
//           </div>
//         </Box>
//       </Modal>
/* update modal end */

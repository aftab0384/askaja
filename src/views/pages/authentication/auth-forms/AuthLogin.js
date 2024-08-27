import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button, Modal,CircularProgress } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { cafeBackend } from 'utils/config';
import { IconX } from '@tabler/icons-react';
import { LOGOUT } from 'store/actions';

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

export const AuthLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({ userName: '', password: '', contactNumber: '', email: '' });
  const [forgetPassForm, setForgetPassForm] = useState({ email: '' });
  const [changePassForm, setChangePassForm] = useState({ userOtp: '', password: '', confirmPassword: '' });
  const navigate = useNavigate();
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [forgetPassOpen, setForgetPassOpen] = useState(false);
  const handelForgetPassOpen = () => setForgetPassOpen(true);
  const handelForgetPassClose = () => setForgetPassOpen(false);

  const [changePassOpen, setChangePassOpen] = useState(false);
  const handelChangePassOpen = () => setChangePassOpen(true);
  const handelChangePassClose = () => setChangePassOpen(false);

  const [addUpdateModal, setAddUpdateModal] = useState({
    addModal: true
  });

  const [addForgetPassModal, SetAddForgetPassModal] = useState({
    AddForgetPassModal: true
  });

  const [addChangePassModal, SetAddChangePassModal] = useState({
    AddChangePassModal: true
  });

  const handleAddModal = () => {
    setAddUpdateModal({ ...addUpdateModal, addModal: true });
    handleOpen();
  };

  const handelForgetPassModal = () => {
    SetAddForgetPassModal({ ...addForgetPassModal, AddForgetPassModal: true });
    handelForgetPassOpen();
  };

  const handelChangePassModal = () => {
    SetAddChangePassModal({ ...addChangePassModal, AddChangePassModal: true });
    handelChangePassOpen();
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (loginForm.userName === '' || loginForm.password === '') {
        window.alert('Missing Field .... ');
        return;
      }

      const body = {
        username: String(loginForm.userName).trim(),
        password: loginForm.password
      };

      const response = await axios.post(`${cafeBackend}/api/public/login`, body);
      //const token = JSON.parse(response.data.jwt);
     // console.log(response);

      if (response.status === 200) {
        toast.success('Login Successfully');

        const parsedResponse = JSON.parse(response.data.jwt);
        const { data, token } = parsedResponse;

        const role = data.roles[0];
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);

        //funcSetRole(role, token);
        navigate('/dashboard');
      }
    } catch (err) {
      console.log(err);

      if (err.response) {
        toast.error(err.response.data.message || 'User not Found');
      } else if (err.request) {
        toast.error('No response received from the server');
      } else {
        toast.error('Error in setting up the request');
      }
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      if (loginForm.userName === '' || loginForm.password === '' || loginForm.contactNumber === '' || loginForm.email === '') {
        window.alert('Missing Field .... ', loginForm.e);
        return;
      }
      const body = {
        name: String(loginForm.userName).trim(),
        contactNumber: loginForm.contactNumber,
        email: loginForm.email,
        password: loginForm.password
      };

      const response = await axios.post(`${cafeBackend}/api/public/signup`, body);
      const results = response.data.result;
      const message = response.data.message;

      if (results === 'success') {
        toast.success(message);
        navigate('/login');
        handleClose();
      } else if (results === 'error') {
        toast.error(message);
      }
    } catch (err) {
      console.log(err.message);
      if (err.response) {
        toast.error(err.response.data.message || 'User not Found');
      } else if (err.request) {
        toast.error('No response received from the server');
      } else {
        toast.error('Error in setting up the request');
      }
    }
  };

  const handleForgetPass = async (e) => {
    e.preventDefault();
    if (isButtonLoading) return;
    try {
      if (forgetPassForm.email === '') {
        window.alert('Missing Field .... ', forgetPassForm.e);
        return;
      }
      localStorage.setItem('userEmail',forgetPassForm.email);
      setIsButtonLoading(true);
      const body = {
        email: forgetPassForm.email
      };

      const response = await axios.post(`${cafeBackend}/api/public/forgetPassword`, body);
      const results = response.data.status;
      const message = response.data.message;

      if (results) {
        toast.success(message);
        navigate('/login');
        handelForgetPassClose();
        handelChangePassOpen();
      } else {
        toast.error(message);
      }
    } catch (err) {
      console.log(err.message);
      if (err.response) {
        toast.error(err.response.data.message || 'User not Found');
      } else if (err.request) {
        toast.error('No response received from the server');
      } else {
        toast.error('Error in setting up the request');
      }
    }finally{
      setIsButtonLoading(false);
    }
  };

  const handleChangePass = async (e) => {
    if (isButtonLoading) return;
    e.preventDefault();
    try {
      if (changePassForm.userOtp === '' || changePassForm.password === '' || changePassForm.confirmPassword === '') {
        window.alert('Missing Field .... ', forgetPassForm.e);
        return;
      }
      if (changePassForm.password !== changePassForm.confirmPassword) {
        window.alert('Password and Confirm Password do not match');
        return;
      }
      const userEmail = localStorage.getItem('userEmail');
      
      setIsButtonLoading(true);
      const body = {
        userOtp: changePassForm.userOtp,
        userPassword: changePassForm.password,
        userEmail: userEmail
      };

      const response = await axios.post(`${cafeBackend}/api/public/changePassword`, body);
      const results = response.data.status;
      const message = response.data.message;

      if (results) {
        toast.success(message);
        navigate('/login');
        handelChangePassClose();
      } else {
        toast.error(message);
      }
    } catch (err) {
      console.log(err.message);
      if (err.response) {
        toast.error(err.response.data.message || 'User not Found');
      } else if (err.request) {
        toast.error('No response received from the server');
      } else {
        toast.error('Error in setting up the request');
      }
    }finally{
      setIsButtonLoading(false);
    }
  };

  
  const verifyToken = async () => {
    try {
      const result = await axios.get('http://localhost:8080/api/public/verifyJwtToken');
      console.log('status after verify token', result.status);
      setIsAuthenticated(true);
      navigate('/dashboard'); // Navigate after successful verification
    } catch (err) {
      console.error('Error occurred during token verification:', err.response);
      handleLogout(); // Logout if verification fails
    }
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <Box className="flex justify-center items-center py-4">
        <form onSubmit={handleLogin} className="w-full">
          <div className="grid grid-cols-1 gap-8">
            <div>
              <FormControl fullWidth>
                <TextField
                  label="User Name"
                  value={loginForm.userName}
                  onChange={(e) => setLoginForm({ ...loginForm, userName: e.target.value })}
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
            <div>
              <Button type="submit" variant="contained" className="bg-blue-700 text-lg" fullWidth>
                Login
              </Button>
            </div>
            <div className="flex justify-center items-center mt-4 gap-4">
              <button onClick={handleAddModal} className="text-blue-500">
                New User? Signup
              </button>
              <button onClick={handelForgetPassModal} className="text-blue-500">
                Forgot Password?
              </button>
            </div>
          </div>
        </form>
      </Box>
      {/* register modal */}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style} className="rounded-xl">
          <div className="relative py-4 flex flex-col gap-5">
            <p className="absolute top-0 right-0">
              <button onClick={handleClose} className="text-black rounded-full p-1 hover:bg-gray-700 hover:text-white">
                <IconX />
              </button>
            </p>
            <div className="text-center">
              <h1 className="text-2xl font-medium">Register Yourself</h1>
            </div>
            {addUpdateModal.addModal && (
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-5">
                  <div>
                    <FormControl fullWidth>
                      <TextField
                        type="text"
                        id="userName"
                        label="Name"
                        value={loginForm.userName}
                        onChange={(e) => setLoginForm({ ...loginForm, userName: e.target.value })}
                      />
                    </FormControl>
                  </div>
                  <div>
                    <FormControl fullWidth>
                      <TextField
                        type="text"
                        id="contactNumber"
                        label="Mobile Number"
                        value={loginForm.contactNumber}
                        onChange={(e) => setLoginForm({ ...loginForm, contactNumber: e.target.value })}
                      />
                    </FormControl>
                  </div>
                  <div>
                    <FormControl fullWidth>
                      <TextField
                        type="text"
                        id="email"
                        label="Email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      />
                    </FormControl>
                  </div>
                  <div>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password-register"
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

                <div>
                  <Button type="submit" variant="contained" className="bg-blue-700 text-lg" fullWidth onClick={handleRegister}>
                    Register
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Box>
      </Modal>

      {/* forget password modal */}
      <Modal
        open={forgetPassOpen}
        // onClose={handelForgetPassClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-xl">
          <div className="relative py-4 flex flex-col gap-5">
            <p className="absolute top-0 right-0">
              <button onClick={handelForgetPassClose} className="text-black rounded-full p-1 hover:bg-gray-700 hover:text-white">
                <IconX />
              </button>
            </p>
            <div className="text-center">
              <h1 className="text-2xl font-medium">Enter your email</h1>
            </div>
            {addForgetPassModal.AddForgetPassModal && (
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-5">
                  <div>
                    <FormControl fullWidth>
                      <TextField
                        type="text"
                        id="email"
                        label="Email"
                        value={forgetPassForm.email}
                        onChange={(e) => setForgetPassForm({ ...forgetPassForm, email: e.target.value })}
                      />
                    </FormControl>
                  </div>
                </div>

                <div>
                  <Button type="submit" variant="contained" className="bg-blue-700 text-lg" fullWidth onClick={handleForgetPass} disabled={isButtonLoading}>
                  {isButtonLoading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Box>
      </Modal>

      {/* change password modal */}
      <Modal
        open={changePassOpen}
        // onClose={handelChangePassClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-xl">
          <div className="relative py-4 flex flex-col gap-5">
            <p className="absolute top-0 right-0">
              <button onClick={handelChangePassClose} className="text-black rounded-full p-1 hover:bg-gray-700 hover:text-white">
                <IconX />
              </button>
            </p>
            <div className="text-center">
              <h2 className="text-2xl font-small">Please check email for otp</h2>
            </div>
            {addChangePassModal.AddChangePassModal && (
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-5">
                  <div>
                    <FormControl fullWidth>
                      <TextField
                        type="text"
                        id="otp"
                        label="Enter Otp"
                        value={changePassForm.userOtp}
                        onChange={(e) => setChangePassForm({ ...changePassForm, userOtp: e.target.value })}
                      />
                    </FormControl>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5">
                  <div>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">Enter Password</InputLabel>
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
                        value={changePassForm.password}
                        onChange={(e) => setChangePassForm({ ...changePassForm, password: e.target.value })}
                        required
                        autoComplete=""
                      />
                    </FormControl>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5">
                  <div>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-confirmPassword">Confirm Password</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword((show) => !show)} edge="end">
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="confirmPassword"
                        value={changePassForm.confirmPassword}
                        onChange={(e) => setChangePassForm({ ...changePassForm, confirmPassword: e.target.value })}
                        required
                        autoComplete=""
                      />
                    </FormControl>
                  </div>
                </div>

                <div>
                  <Button type="submit" variant="contained" className="bg-blue-700 text-lg" fullWidth onClick={handleChangePass} disabled={isButtonLoading}>
                  {isButtonLoading ? <CircularProgress size={24} color="inherit" /> : "Submit"} {/* Show loader circle or "Submit" */}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
};

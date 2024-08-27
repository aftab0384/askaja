import React, { useState, useEffect } from 'react';
import { TextField, FormControl, CircularProgress } from '@mui/material';

import { createAxiosInstance, cafeBackend, aavgbackend } from 'utils/config';

export const DriverOtp = () => {
  const [busDetails, setBusDetails] = useState({
    busNumber: ''
  });
  const [driverDetails, setDriverDetails] = useState({});
  const [otpErr, setOtpErr] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const handleDriverOtp = () => {
    if (busDetails.busNumber !== '') {
      setIsButtonLoading(true);
      const body = {
        busNumber: busDetails.busNumber.trim()
      };
      const axiosInstance = createAxiosInstance();
      axiosInstance
        .post(`${aavgbackend}/app/v1/driver/getDriverOtp`, body)
        .then((res) => {
          setIsButtonLoading(false);
          setDriverDetails(res.data.result);
        })
        .catch((err) => {
          setIsButtonLoading(false);
          console.log('Api error', err);
        });
      setOtpErr(false);
    } else {
      setIsButtonLoading(false);
      setOtpErr(true);
    }
  };

  return (
    <>
      <div>
        <div className="bg-white p-5 flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl text-center font-semibold">Driver Otp</h1>
            {/* <div className="flex justify-center items-center gap-5 p-1"> */}
            <div className="grid grid-cols-[1fr_90px] mx-auto justify-center items-center gap-6 p-5">
              <FormControl className="w-84 max-lg:w-96 max-md:w-56 ">
                <TextField
                  label="Enter Bus Number"
                  type="text"
                  variant="outlined"
                  onChange={(e) => setBusDetails({ ...busDetails, busNumber: e.target.value })}
                />
                {otpErr && <p className="text-red-500 text-xs ml-2">Please Enter Bus Number</p>}
              </FormControl>
              <button
                className="bg-blue-700 text-white py-3 px-2 rounded-md hover:bg-blue-500"
                onClick={handleDriverOtp}
                disabled={isButtonLoading}
              >
               {isButtonLoading ? <CircularProgress size={20} color="inherit"/> :"Submit" }
              </button>
            </div>
          </div>
        </div>
        <div className="p-5 flex justify-center items-center">
          <div className="p-10 min-w-72 text-base bg-white">
            <p className='flex justify-between'>
              <span className="font-semibold text-blue-700 w-36">Driver Name: </span>
              <span>{driverDetails.driver_name ?? "----"}</span>
            </p>
            <p  className='flex justify-between'>
              <span className="font-semibold text-blue-700 w-36">OTP: </span> <span>{driverDetails.driver_otp ?? 'Not found'}</span>
            </p>
            <p  className='flex justify-between'>
              <span className="font-semibold text-blue-700 w-36">OTP Expire At: </span>
              <span>{driverDetails.otpExpireAt ?? "----" }</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

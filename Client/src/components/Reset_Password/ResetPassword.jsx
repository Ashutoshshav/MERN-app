import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    OTP: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [msg, setMsg] = useState("");

  let setInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  let sendOTP = async () => {
    const response = await axios
      .post("http://localhost:3000/user/forgetpassword", data)
      .then((res) => {
        if (res.status == 200) {
          setMsg("OTP has been sent");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let verifyOTP = async () => {
    const response = await axios
      .post("http://localhost:3000/user/checkOTP", data)
      .then((res) => {
        if (res.status == 200) {
          setMsg("OTP Verified");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let resetPassword = async () => {
    const response = await axios
      .post("http://localhost:3000/user/resetPassword", data)
      .then((res) => {
        if (res.status == 200) {
          setMsg("Password reset Successfully");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white shadow-lg rounded-lg p-8 max-w-sm w-full'>
        <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>
          Reset Password
        </h2>

        <p className='text-center text-blue-700 font-medium'>{msg}</p>
        <div>
          <div className='mb-2'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='email'>
              Email
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='email'
              type='email'
              placeholder='Enter Email'
              onChange={setInput}
              name='email'
              value={data.email}
            />

            <button
              className='w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 my-4 rounded focus:outline-none focus:shadow-outline'
              type='button'
              onClick={sendOTP}>
              Send OTP
            </button>
          </div>

          <div>
            <div className='mb-1'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='OTP'>
                Enter OTP
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='OTP'
                type='OTP'
                placeholder='Enter OTP'
                onChange={setInput}
                name='OTP'
                value={data.OTP}
              />
              <button
                className='w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 my-4 rounded focus:outline-none focus:shadow-outline'
                type='submit'
                onClick={verifyOTP}>
                Verify OTP
              </button>
            </div>
          </div>
          <div>
            <div className='mb-1'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='newPassword'>
                New Password
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                id='newPassword'
                type='password'
                placeholder='Enter New Password'
                onChange={setInput}
                name='newPassword'
                value={data.newPassword}
              />
            </div>
            <div className='mb-2'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='confirmPassword'>
                Confirm Password
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                id='confirmPassword'
                type='password'
                placeholder='Enter Confirm Password'
                onChange={setInput}
                name='confirmPassword'
                value={data.confirmPassword}
              />
            </div>
            <button
              className='w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='submit'
              onClick={resetPassword}>
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

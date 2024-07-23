import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  let setInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  let handleSubmit = (e) => {
    e.preventDefault();

    if (data.email && data.name && data.password) {
      axios
        .post("http://localhost:3000/user/signup", data)
        .then(() => {
          navigate("/login");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setErrorMsg("Please enter Name, Email and Password");
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h1 className='text-2xl font-bold text-center text-gray-800 mb-6'>Signup</h1>
        {errorMsg ? <p className="text-center text-red-500 font-medium mb-4">{errorMsg}</p> : ""}
        <form
          action=''
          method='POST'
          onSubmit={handleSubmit}>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="name" placeholder="Enter Name" onChange={setInput} name='name' value={data.name} />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter Email" onChange={setInput} name='email' value={data.email} />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Enter Password" onChange={setInput} name='password' value={data.password} />
          </div>

          <div className="flex items-center justify-between">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type='submit'>Signup</button>
          </div>
        </form>
      </div>
    </div>
  );
}

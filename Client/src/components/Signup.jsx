import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Signup() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  let setInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  let handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/user/signup", data)
      .then(() => {
        navigate("/login");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className='my-auto'>
      <h1 className='text-4xl text-center my-4'>Signup</h1>
      <form
        action=''
        className='m-auto flex flex-col w-auto justify-center items-center'
        method='POST'
        onSubmit={handleSubmit}>
        <TextField
          id='filled-basic'
          label='Enter Name'
          variant='filled'
          className='flex-initial w-80'
          style={{ margin: "10px" }}
          onChange={setInput}
          name='name'
          value={data.name}
        />

        <TextField
          id='filled-basic'
          label='Enter Email'
          variant='filled'
          className='flex-initial w-80'
          style={{ margin: "10px" }}
          onChange={setInput}
          name='email'
          value={data.email}
        />

        <TextField
          id='filled-basic'
          label='Enter Password'
          variant='filled'
          className='flex-initial w-80'
          style={{ margin: "10px" }}
          onChange={setInput}
          name='password'
          value={data.password}
        />

        <Button
          variant='contained'
          color='success'
          style={{ margin: "10px", padding: "10px 20px" }}
          type='submit'>
          Signup
        </Button>
      </form>

      <div className="flex items-center justify-between">
        <Link to='/login'>
          <Button
            variant='contained'
            color='success'
            style={{ margin: "10px", padding: "10px 20px" }}>
            Login
          </Button>
        </Link>

        <Link to='/'>
          <Button
            variant='contained'
            color='success'
            style={{ margin: "10px", padding: "10px 20px" }}>
            Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Login() {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  let setInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post("http://localhost:3000/user/login", data)
      .then((response) => {
        //console.log(response.data.token);
        if(response.data.token == null) {
          setErrorMsg("Please Check your Email or Password")
          navigate("/login");
        } else {
          localStorage.setItem("token", response.data.token);
          navigate("/");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className='my-auto'>
      <h1 className='text-4xl text-center my-4'>Login</h1>
      { errorMsg ? (<p className="text-center text-red-500">{errorMsg}</p>) : ""}
      <form
        action=''
        className='m-auto flex flex-col w-auto justify-center items-center'
        method='POST'
        onSubmit={handleSubmit}>
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
          Login
        </Button>
      </form>

      <Link to='/signup'>
        <Button
          variant='contained'
          color='success'
          style={{ margin: "10px", padding: "10px 20px" }}>
          Signup
        </Button>
      </Link>
    </div>
  );
}

export default Login;

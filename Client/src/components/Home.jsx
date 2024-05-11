import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Home() {
  const navigate = useNavigate();

  let token = localStorage.getItem("token");

  const [data, setData] = useState(null);
  const [url, setUrl] = useState("");

  async function fetchData() {
    const response = await axios.get("http://localhost:3000/");
    //console.log(response.data.allURL);
    setData(response.data.allURL);
  }
  fetchData();


  let handleChange = (event) => {
    setUrl(event.target.value);
  };

  let handleSubmit = async (event) => {
    event.preventDefault();
    //console.log(url);
    if (!token) {
      navigate("/login");
    } else {
      axios
        .post(
          "http://localhost:3000/url/",
          { url: url },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        )
        .then(() => {
          setUrl("");
          navigate("/");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  let handleSearch = async (id) => {
    //console.log(id);
    let response = await axios
      .get(`http://localhost:3000/url/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        //console.log(response);
        window.open(response.data, "_blank");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div style={{ margin: "auto" }}>
      <div className='flex justify-center px-6 whitespace items-center px-6 whitespace'>
        <Link to='/login'>
          <Button
            variant='contained'
            color='success'
            style={{ margin: "10px 30px", padding: "10px 30px" }}
            className='px-4 py-2 text-sm md:px-6 md:py-3 md:text-base lg:px-8 lg:py-4 lg:text-lg xl:px-10 xl:py-5 xl:text-xl'>
            Login
          </Button>
        </Link>

        <h1 className='text-center text-2xl md:text-left lg:text-right'>
          URL Shortner
        </h1>

        <Link to='/signup'>
          <Button
            variant='contained'
            color='success'
            style={{ margin: "10px 30px", padding: "10px 30px" }}
            className='px-4 py-2 text-sm md:px-6 md:py-3 md:text-base lg:px-8 lg:py-4 lg:text-lg xl:px-10 xl:py-5 xl:text-xl'>
            Signup
          </Button>
        </Link>
      </div>

      <form action='' onSubmit={handleSubmit}>
        <div
          className='my-12'
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>

          <TextField
            id='outlined-basic'
            label='Enter URL'
            variant='outlined'
            style={{ margin: "10px" }}
            onChange={handleChange}
            value={url}
            className='bg-black-100 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 md:border-blue-500 lg:border-green-500 xl:border-red-500'
          />
          
          <Button
            variant='contained'
            size='large'
            className='m-2'
            style={{ margin: "10px" }}
            type='submit'>
            <p className='text-sm md:text-base lg:text-lg xl:text-xl'>
              Short URL
            </p>
          </Button>
        </div>
      </form>

      <div className='overflow-x-auto'>
        <table className='m-auto border-separate border border-slate-400'>
          <thead>
            <tr className='text-xl bg-gray-300'>
              <th className='border border-slate-900 px-6 py-2 text-left text-xs font-medium text-black-500 uppercase tracking-wider'>
                Serial No
              </th>
              <th className='border border-slate-900 px-6 py-2 text-left text-xs font-medium text-black-500 uppercase tracking-wider'>
                Redirect URL
              </th>
              <th className='border border-slate-900 px-6 py-2 text-left text-xs font-medium text-black-500 uppercase tracking-wider'>
                ShortID
              </th>
              <th className='border border-slate-900 px-6 py-2 text-left text-xs font-medium text-black-500 uppercase tracking-wider'>
                ShortURL
              </th>
              <th className='border border-slate-900 px-6 py-2 text-left text-xs font-medium text-black-500 uppercase tracking-wider'>
                Clicks
              </th>
              <th className='border border-slate-900 px-6 py-2 text-left text-xs font-medium text-black-500 uppercase tracking-wider'>
                Redirect
              </th>
            </tr>
          </thead>

          <tbody>
            {data &&
              data.map((item, index) => (
                <tr key={item._id}>
                  <td className='border border-slate-400 text-center px-6 whitespace'>
                    <p>{index + 1}</p>
                  </td>
                  <td className='border border-slate-400 text-center px-6 whitespace'>
                    <h4>{item.redirectURL}</h4>
                  </td>
                  <td className='border border-slate-400 text-center px-6 whitespace'>
                    <p>{item.shortId}</p>
                  </td>
                  <td className='border border-slate-400 text-center px-6 whitespace'>
                    <p>localhost:3000/url/{item.shortId}</p>
                  </td>
                  <td className='border border-slate-400 text-center px-6 whitespace'>
                    <p>{item.visitHistory.length}</p>
                  </td>
                  <td className='border border-slate-400 text-center px-6 whitespace'>
                    <Button
                      className='p-8'
                      variant='text'
                      onClick={() => handleSearch(item.shortId)}>
                      Click
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

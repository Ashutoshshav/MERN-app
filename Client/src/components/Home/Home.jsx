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
  const [copy, setCopy] = useState({
    copyTick: true,
    copyIndex: null,
  });

  async function fetchData() {
    const response = await axios.get("http://localhost:3000/");
    setData(response.data.allURL);
  }
  fetchData();

  let handleChange = (event) => {
    setUrl(event.target.value);
  };

  let handleSubmit = async (event) => {
    event.preventDefault();
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

  let handleUrlAnalitics = async (id) => {
    navigate(`/analitics/${id}`);
  };

  let textCopy = async (copyTick, text, index) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopy({ copyTick: !copyTick, copyIndex: index });
      })
      .catch((err) => {
        console.log("text not copied");
      });
  };
  return (
    <div className='max-w-full w-full p-4'>
      <form action='' onSubmit={handleSubmit}>
        <div className='md:flex justify-center items-center my-8'>
          <input
            type='text'
            placeholder='Enter your URL here'
            className='w-full md:w-auto px-4 py-2 border border-gray-300 rounded my-2 mr-2'
            onChange={handleChange}
            value={url}
          />

          <button
            className='w-full md:w-auto px-4 py-2 bg-green-500 rounded my-2 text-white hover:bg-green-700'
            type='submit'>
            SHORT URL
          </button>
        </div>
      </form>

      <div className='overflow-x-auto rounded-md'>
        <table className='mx-auto'>
          <thead>
            <tr className=''>
              <th className='p-2 border border-gray-300 bg-gray-200'>
                Serial No
              </th>
              <th className='p-2 border border-gray-300 bg-gray-200 text-left'>
                Redirect URL
              </th>
              <th className='p-2 border border-gray-300 bg-gray-200'>
                ShortID
              </th>
              <th className='p-2 border border-gray-300 bg-gray-200'>
                ShortURL
              </th>
              <th className='p-2 border border-gray-300 bg-gray-200'>Clicks</th>
              <th className='p-2 border border-gray-300 bg-gray-200'>
                Analitics
              </th>
            </tr>
          </thead>

          <tbody>
            {data &&
              data.map((item, index) => (
                <tr key={item._id} className='even:bg-gray-50'>
                  <td className='p-2 text-center border border-gray-300'>
                    <p>{index + 1}</p>
                  </td>
                  <td className='p-2 border border-gray-300'>
                    <h4>{item.redirectURL}</h4>
                  </td>
                  <td className='p-2 border border-gray-300'>
                    <p>{item.shortId}</p>
                  </td>
                  <td className='flex justify-between p-2 border-gray-300 w-full'>
                    <p className='p-2 bg-blue-100 rounded-l-full w-5/6'>
                      localhost:3000/url/{item.shortId}
                    </p>

                    <button
                      className='p-1 bg-blue-500 text-white rounded-r-lg w-1/6'
                      onClick={() =>
                        textCopy(
                          copy.copyTick,
                          `localhost:3000/url/${item.shortId}`,
                          index
                        )
                      }>
                      {copy.copyIndex != index ? (
                        <p>Copy</p>
                      ) : (
                        <i className='fa-solid fa-check'></i>
                      )}
                    </button>
                  </td>
                  <td className='p-2 text-center border border-gray-300'>
                    <p>{item.visitHistory.length}</p>
                  </td>
                  <td className='p-2 border border-gray-300'>
                    <Button
                      className='p-8'
                      variant='text'
                      onClick={() => handleUrlAnalitics(item.shortId)}>
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

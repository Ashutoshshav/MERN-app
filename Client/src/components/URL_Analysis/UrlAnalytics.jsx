import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UrlAnalytics() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [createdBy, setCreatedBy] = useState("");

  let {id} = useParams();
  let token = localStorage.getItem("token");
  
  useEffect(() => {
    if(!token) {
      navigate("/login");
    } else {
      async function fetchAnalytics() {
        await axios
          .get(`http://localhost:3000/url/analytics/${id}`, {
            headers: {
              Authorization: `${token}`,
            },
          })
          .then((response) => {
            setCreatedBy(response.data.createdBy)
            setData(response.data.analytics);
          })
          .catch((e) => {
            console.log(e);
          });
      }
      fetchAnalytics();
    }
  }, [id])

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className='text-3xl font-bold text-center text-gray-800 mb-4'>Click Timing of URL</h1>

      <h3 className="text-center text-gray-600 mb-4">This URL is created by {createdBy}</h3>
      
      {data && data.map((item, index) => (
        <div className="flex justify-center border hover:bg-gray-100 rounded-lg m-4" key={item._id}>
          <p className="py-2 px-4">{index + 1}.</p>
          <p className="py-2 px-4">{formatDate(item.timestamp)}</p>
        </div>
      ))
      }
    </div>
  );
}

import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  return (
    <div className='flex justify-between items-center p-4 border-b-2 bg-gray-100'>
      <Link to='/'>
        <h1 className='text-xl sm:text-2xl font-bold'>URL Shortner</h1>
      </Link>

      <div className='flex gap-4'>
        <Link to='/login'>
          <button className='px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-700'>
            Login
          </button>
        </Link>

        <Link to='/signup'>
          <button className='px-4 py-2 rounded bg-green-500 text-white hover:bg-green-700'>
            Signup
          </button>
        </Link>
      </div>
    </div>
  );
}

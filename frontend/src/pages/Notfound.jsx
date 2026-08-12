import React from 'react';
import { Link } from 'react-router-dom';

const Notfound = () => {
  return (
    <div className='min-h-screen flex justify-center items-center bg-white'>
      <div className='text-center p-8'>
        <h1 className='text-4xl font-bold mb-2'>404</h1>
        <p className='text-gray-800 mb-6'>Page Not Found</p>
        <Link to="/" className='px-4 py-2 rounded-md bg-indigo-700 text-white'>
          Go back home
        </Link>
      </div>

    </div>
  )
}

export default Notfound

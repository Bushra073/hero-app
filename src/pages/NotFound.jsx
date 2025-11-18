import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-9xl font-extrabold text-indigo-100">404</h1>
      <div className="bg-indigo-600 text-white px-3 py-1 text-base font-medium rounded-full -mt-8 mb-6 shadow-md">
        Page Not Found
      </div>
      <h2 className="text-3xl font-bold mt-4 mb-4 text-gray-900">Oops! Looks like this path doesn't exist.</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        The route you tried to access is invalid. Please use the navigation links or return to the home page.
      </p>
      <Link 
        to="/"
        className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-indigo-700 transition-transform hover:-translate-y-1"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex items-center flex-col justify-center h-screen">
      <h1 className="text-bold text-3xl font-rale">Oops. Page Not Found</h1>
      <Link
        to="/"
        className="py-1 px-2 bg-primary hover:bg-hover font-bold rounded-md my-3 text-white"
      >
        Back Home
      </Link>
    </div>
  );
}

export default NotFound;

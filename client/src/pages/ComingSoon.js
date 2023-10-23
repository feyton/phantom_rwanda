import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ComingSoon({ title }) {
  const navigate = useNavigate();
  return (
    <div className="justify-self-center w-full h-full relative bg-gray-300 md:min-w-[300px] min-h-[300px] p-9">
      <div className="flex flex-col items-center justify-center top-0 left-0 right-0 bottom-0">
        <h2 className="text-xl font-bold text-primary  pb-5">
          You tried to access <b className="text-black">{`<<${title}>>`}</b> but
          this page is...
        </h2>
        <h1 className="text-3xl font-bold pb-5">Coming Soon</h1>
        <div className="flex flex-row w-fit justify-between">
          <Link
            to="/"
            className="bg-primary font-bold px-3 py-1 rounded-md mr-2"
          >
            Home
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="bg-transparent border-2 border-primary font-bold font-rale rounded-md px-3 py-1"
          >
            {'<< Back'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ComingSoon;

import React from 'react';
import { Link } from 'react-router-dom';

function PasswordChanged() {
  return (
    <>
      <h3 className="text-2xl text-center font-rale font-bold mb-2">
        Password Changed
      </h3>
      <hr />
      <div className="text-left">
        <p className="py-1 mb-2  text-sm">
          Dear, you got yourself a new password.
        </p>
        <Link
          to="/login"
          className="py-1 px-3  bg-primary hover:bg-hover text-white rounded-md font-bold mt-5 mx-auto"
        >
          Login
        </Link>

        <p className="py-1 mt-2 text-sm">
          You will receive email confirming your changes.
        </p>
      </div>
    </>
  );
}

export default PasswordChanged;

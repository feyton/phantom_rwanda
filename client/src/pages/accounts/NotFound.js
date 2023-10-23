import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './AccountRouter.js';

function NotFoundAccount() {
  return (
    <div className="w-fit flex flex-col justify-center items-center p-3">
      <h3 className="text-3xl font-bold pb-4">Oops... Not Found</h3>
      <Link to="/">
        <Button name="Home" styles=" bg-primary mt-2" />
      </Link>
    </div>
  );
}

export default NotFoundAccount;

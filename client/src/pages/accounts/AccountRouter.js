import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ResetFormPage from './EmailForm.js';
import ResetEmail from './EmailSent.js';
import ResetNewPassword from './NewPasswordForm.js';
import NotFoundAccount from './NotFound.js';
import ResetSuccess from './PasswordChanged.js';

const img =
  'https://res.cloudinary.com/feyton/image/upload/v1645616111/Codebandits/Phantom_icon_1_tpjkws.png';

export const Button = ({ name, styles, type, icon }) => {
  return (
    <div>
      <button
        type={type || 'button'}
        className={`rounded-md transition-all text-white py-1 px-5 mt-2 ${
          icon === 'cancel' ? 'bg-red-500' : 'bg-primary'
        } hover:bg-hover hover:transition-all font-bold ${styles}`}
      >
        {name}
      </button>
    </div>
  );
};

function ResetRouterLayout() {
  return (
    <div className="min-h-[75vh] h-full flex flex-col pb-40 md:pb-2 relative py-4 md:flex-row items-center justify-center">
      <div className="max-w-sm mr-10 mt-[-60px] md:flex md:items-center md:justify-center md:mx-auto md:my-[auto] xl:ml-64">
        <img src={img} alt="placeholder-img" className="w-full object-cover" />
      </div>

      <div className="flex flex-col  py-3 px-4 w-72 md:w-80 md:min-w-[300px] md:max-w-sm shadow-main absolute bg-white top-16 md:top-0 md:mx-auto md:relative rounded-lg xl:mr-64">
        <Routes>
          <Route path="reset-password" element={<ResetFormPage />} />
          <Route path="reset-success" element={<ResetSuccess />} />
          <Route path="reset-password/:token" element={<ResetNewPassword />} />
          <Route path="reset-email/" element={<ResetEmail />} />
          <Route path="*" element={<NotFoundAccount />} />
        </Routes>
      </div>
    </div>
  );
}

export default ResetRouterLayout;

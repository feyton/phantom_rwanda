import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from './Button.js';
import LanguageButton from './LanguageButton.js';

const MobileMenu = ({ styles }) => {
  const { authenticated } = useSelector((state) => state?.auth);
  return (
    <div
      className={`${styles} flex flex-col font-raleway md:hidden lg:hidden xl:hidden border px-8 pt-6 pb-8 mr-6 z-50`}
    >
      <div>
        <Link to={!authenticated ? '/login' : '/dashboard/main'}>
          <div>
            <Button
              name={authenticated ? 'Dashboard' : 'For operators'}
              styles="bg-primary hover:bg-hover text-white text-md rounded-xl my-2 px-8 py-3"
            />
          </div>
        </Link>
        <Link to="/tracking-page">
          <Button
            name="Track Bus"
            styles="border border-primary bg-background hover:bg-hover2 text-primary rounded-xl mt-2 mb-4 px-11 py-3"
          />
        </Link>
      </div>

      <LanguageButton className="mt-2" />
    </div>
  );
};

export default MobileMenu;

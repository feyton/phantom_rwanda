import React, { forwardRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import phantom from '../assets/phantom.png';
import xmark from '../assets/xmark.svg';
import Burger from './Burger.js';
import Button from './Button.js';
import LanguageButton from './LanguageButton.js';
import MobileMenu from './MobileMenu.js';
import withClickOutside from './WithClickOutside.js';

const Header = forwardRef(({ open, setOpen }, ref) => {
  const { authenticated, user } = useSelector((state) => state?.auth);
  const [style, setStyle] = useState('hidden');
  const [icon, setIcon] = useState(<Burger />);
  const handleToggleMenu = () => {
    if (style === 'hidden') {
      setStyle('flex z-50');
      setIcon(<img src={xmark} alt="x mark" className="w-6" />);
    } else {
      setStyle('hidden');
      setIcon(<Burger />);
    }
  };
  const { t } = useTranslation();
  return (
    <div className="flex bg-background border-b-4 pb-4 sticky top-0 z-20">
      <div>
        <Link to="/">
          <img
            src="https://res.cloudinary.com/keza/image/upload/v1672036898/falcon-logo_1_wnbmct.png"
            alt="Phantom"
            className="w-44 xl:w-48 ml-8 xl:ml-20 mt-4"
          />
        </Link>
      </div>

      <div className="hidden md:flex xl:flex ml-auto mr-20">
        <Link to={!authenticated ? '/login' : '/dashboard'}>
          <Button
            name={!authenticated ? 'For operators' : 'Dashboard'}
            styles="bg-primary hover:bg-hover text-white rounded-xl mt-5 ml-6"
          />
        </Link>
        <Link to="/tracking-page">
          <Button
            name={t('track_bus')}
            styles="border border-primary bg-background hover:bg-hover2 text-primary rounded-xl mt-5 ml-6 px-6"
          />
        </Link>
        <LanguageButton />
      </div>
      <section
        ref={ref}
        className="flex flex-col absolute right-0 bg-background px-2"
      >
        <button
          type="button"
          id="toggle"
          className="md:hidden xl:hidden ml-auto mr-12 mt-5"
          onClick={() => setOpen(!open)}
        >
          {!open && <Burger />}
          {open && <img src={xmark} alt="xmark" className="w-6 mb-2" />}
        </button>

        {open && <MobileMenu />}
      </section>
    </div>
  );
});

export default withClickOutside(Header);

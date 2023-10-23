import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t } = useTranslation();
  const { authenticated, user } = useSelector((state) => state?.auth);
  return (
    <footer className="flex bg-primary z-20 xl:justify-center md:text-xl text-background font-sans font-sm py-8 lg:py-2 xl:py-2 mt-auto">
      <div className="flex flex-col lg:flex-row xl:flex-row px-12 text-center items-center">
        <img
          src="https://res.cloudinary.com/keza/image/upload/v1672036898/falcon-logo_1_wnbmct.png"
          alt="Codebandits"
          className="w-24 ml-2 lg:ml-8 lg:mt-4 xl:mt-2"
        />
        <h3 className="lg:ml-8 xl:ml-20 mt-6 xl:mt-2">
          &copy;{t('copyrights')} Falcon 2022
        </h3>
      </div>
      <div className="flex flex-col md:text-xl lg:flex-row xl:flex-row lg:mt-7 xl:mt-3 mr-16 md:mx-20 xl:ml-20 ml-auto md:ml-auto">
        <Link
          to="/#"
          className="xl:ml-0 lg:ml-0 mt-2 text-md mb-4 hover:font-bold"
        >
          Support
        </Link>
        <Link
          to="/#"
          className="xl:ml-28 lg:ml-12 mt-2 text-md mb-4 hover:font-bold"
        >
          {t('terms')}
        </Link>
        <Link
          to={!authenticated ? '/login' : '/dashboard'}
          className="xl:ml-28 lg:ml-12 mt-2 text-md hover:font-bold"
        >
          {t('administration')}
        </Link>
      </div>
    </footer>
  );
};

export default Footer;

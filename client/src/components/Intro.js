import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import bus from '../assets/bus.png';
import Button from './Button.js';

const Intro = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center lg:flex-row xl:flex-row">
      <div>
        <h1 className="flex flex-col text-3xl md:text-5xl xl:text-5xl font-raleway font-extrabold mx-12 xl:mx-28 mt-24 md:mt-32 xl:mt-32">
          <span>{t('hero_head_1')}</span>
          <span className="md:ml-10 ml-4">{t('hero_head_2')}</span>
        </h1>
        <div className="flex flex-col text-sm md:text-xl xl:text-base mx-20 md:ml-32 xl:ml-52 mt-10">
          <p>{t('hero_text_1')}</p>
          <div>
            <p className="ml-4">{t('hero_text_2')}</p>
          </div>
        </div>
        <div className="flex flex-row justify-center w-fit">
          <Link to="tracking-page">
            <Button
              name={t('hero_btn')}
              styles="bg-primary hover:bg-hover text-white rounded-3xl mt-12 px-12 xl:px-12 py-2 ml-18 md:ml-28 xl:ml-44"
            />
          </Link>
        </div>
      </div>
      <div className="w-full px-20 lg:w-80 xl:w-96 lg:ml-auto xl:ml-auto lg:mr-36 xl:mr-36 lg:px-0 xl:px-0 mt-28">
        <img src={bus} alt="Bus" />
      </div>
    </div>
  );
};

export default Intro;

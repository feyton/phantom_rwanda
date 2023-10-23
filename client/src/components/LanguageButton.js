import i18next from 'i18next';
import React, { useEffect, useRef } from 'react';
import getLanguage from '../utils/getLanguage.js';

const LanguageButton = () => {
  const lanRef = useRef();
  const lan = getLanguage();
  const handleChange = (e) => {
    const { value } = e.target;
    i18next.changeLanguage(value);
  };
  useEffect(() => {
    if (lanRef.current) {
      lanRef.current.value = lan;
    }
  }, []);
  return (
    <div>
      <select
        ref={lanRef}
        onChange={(e) => handleChange(e)}
        className="bg-background border outline-none md:ml-6 lg:ml-6 xl:ml-6 mt-5 flex py-2 px-4 text-sm hover:font-bold"
      >
        <option
          value="en"
          className=" border-none bg-background w-full cursor-pointer"
        >
          English
        </option>
        <option
          value="fr"
          className=" border-none bg-background w-full cursor-pointer"
        >
          French
        </option>
        <option
          value="kn"
          className=" border-none bg-background cursor-pointer"
        >
          Kinyarwanda
        </option>
      </select>
    </div>
  );
};

export default LanguageButton;

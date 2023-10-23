import React, { forwardRef } from 'react';
import closeMark from '../assets/close-mark.svg';
import Burger from './Burger.js';
import SideNav from './SideNav.js';
import withClickOutside from './WithClickOutside.js';

const SideBar = forwardRef(({ open, setOpen }, ref) => {
  return (
    <div className="relative z-10 md:z-0 h-full ">
      <SideNav styles="hidden md:flex lg:flex xl:flex " />
      <div ref={ref} className="flex">
        {open && <SideNav styles="fixed" />}
        <button
          id="button"
          type="button"
          onClick={() => setOpen(!open)}
          className="md:hidden lg:hidden xl:hidden"
        >
          {!open && (
            <Burger
              styles=" ml-2 bg-black"
              bgStyles="fixed top-2 left-[-10px] bg-gray-300 p-1 opacity-[0.5]"
            />
          )}
          {open && (
            <img
              src={closeMark}
              alt="angle right"
              className="fixed left-44 top-0 h-6 mt-2 ml-2"
            />
          )}
        </button>
      </div>
    </div>
  );
});

export default withClickOutside(SideBar);

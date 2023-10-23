import React from 'react';
import { NavLink } from 'react-router-dom';

const SideNavLink = ({ image, name, linkTo }) => {
  return (
    <li>
      <NavLink
        to={linkTo}
        className={(navData) =>
          navData.isActive
            ? 'py-2 pr-10 pl-4 rounded-full font-bold my-1 bg-gray-400   hover:bg-gray-300 transition-all  cursor-pointer min-w-fit w-full flex items-center'
            : 'py-2 pr-10 pl-4 rounded-full font-bold my-1  hover:bg-gray-300 transition-all  cursor-pointer min-w-fit w-full flex items-center'
        }
      >
        <img src={image} alt="icon" className="w-6 mr-2" />

        <span>{name}</span>
      </NavLink>
    </li>
  );
};

export default SideNavLink;

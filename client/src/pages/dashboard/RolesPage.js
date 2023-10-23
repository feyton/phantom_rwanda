import RoleComponent from '@components/RoleCompent';
import React from 'react';
import rolesDB from '../../database/rolesDB.json';

const roles = rolesDB;

function Roles() {
  return (
    <div className="w-full h-full font-raleway px-10 pt-3">
      <h1 className="text-2xl font-bold text-center justify-center font-rale">
        Manage roles and permissions
      </h1>
      <div className="mt-6 p-5 rounded-md shadow-main">
        <div className="w-full border rounded-sm p-2 ">
          <div>
            <ul className="grid grid-cols-[30%_60%] gap-1 border-b-2 font-raleway  font-bold py-1 px-2">
              <li>Role</li>
              <ul className="grid grid-cols-2">
                <li>Resources</li>
                <li>Permissions</li>
              </ul>
            </ul>
          </div>
          <div className="border-b-2">
            {roles.map((role) => {
              return <RoleComponent key={role.name} role={role} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Roles;

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PrimaryButton } from '../components/Button.js';

function ChangeRole() {
  const navigate = useNavigate();
  const location = useLocation();
  const [newRole, setNewRole] = useState(null);
  const { name, email, role } = location?.state;
  const roles = [
    { name: 'Admin', info: 'Highest priviledges', value: 1 },
    { name: 'Operator', info: 'Can add and view drivers', value: 2 },
    { name: 'Driver', info: 'Can start and stop car', value: 3 }
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    const { value } = e.target.permission;
    const role = roles.filter((entry) => {
      return entry.value == value;
    });
    setNewRole(role[0]);
    toast('Successfully change the user role to ', { type: 'success' });
    navigate(-1);
  };
  return (
    <div className="font-raleway py-2 px-4">
      <h1 className="font-bold font-raleway text-center text-2xl mb-2">
        Change user's role
      </h1>
      <hr />
      <div className="mt-2">
        <ul>
          <li>
            <b>Name</b>: {name}
          </li>
          <li>
            <b>Email</b>: {email}
          </li>
          <li>
            <b>Role</b>: {newRole?.name || 'Driver'}
          </li>
          <li>
            {newRole?.info && (
              <>
                <b>Priviledges:</b>
                <span>{newRole.info}</span>
              </>
            )}
          </li>
        </ul>
      </div>
      <form
        action="#none"
        id="role-form"
        className="block"
        onSubmit={handleSubmit}
      >
        <label htmlFor="permissions" className="required block my-3">
          Change role:
        </label>
        <select
          required
          aria-required
          name="permission"
          id="permissions"
          className="bg-gray-300 block my-2 border px-2 py-1 rounded-sm placeholder:font-raleway uppercase"
        >
          <option value="" hidden>
            Choose new role
          </option>
          {roles.map((role) => {
            return (
              <option value={role.value} key={role.name}>
                {role.name}
              </option>
            );
          })}
        </select>
        <PrimaryButton type="submit" name="Continue" />
      </form>
    </div>
  );
}

export default ChangeRole;

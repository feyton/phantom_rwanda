import React from 'react';
import { toast } from 'react-toastify';

const handleEdit = () => {
  toast('Edit clicked');
};
const handleDelete = () => {
  toast('Delete clicked');
};
const handlePermission = () => {
  toast('Permissions clicked');
};

function DriverManagement() {
  const handleChange = (e) => {
    switch (e.target.value) {
      case 'edit':
        return handleEdit();
      case 'delete':
        return handleDelete();
      case 'permission':
        return handlePermission();
    }
  };
  return (
    <div className="z-10">
      <select
        onChange={handleChange}
        role="select"
        name=""
        id=""
        className="py-1 px-3 font-rale font-bold bg-transparent border rounded-sm"
      >
        <option hidden>Manage</option>
        <option className="cursor-pointer" value="edit">
          Edit
        </option>
        <option className="cursor-pointer" value="delete">
          Delete
        </option>
        <option className="cursor-pointer" value="permission">
          Permissions
        </option>
      </select>
    </div>
  );
}

export default DriverManagement;

import { axiosBase as axios } from '@utils/Api.js';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import CheckRole from '../utils/CheckRoles.js';
import { ButtonLoading } from './Button.js';

function ManageDropdown({ row }) {
  const { user, license, bus, id } = row.original;
  const navigate = useNavigate();
  const selectRef = useRef();
  const [loading, setloading] = useState(false);
  const handleEdit = () => {
    toast('Clicked');
  };

  const data = {
    id,
    name: user.firstName,
    email: user.email,
    license,
    bus
  };
  const handlePermissions = () => {
    selectRef.current.value = 'manage';
    navigate(`/dashboard/modal/permission/change/${license}`, {
      state: data
    });
  };
  const handleAssign = () => {
    selectRef.current.value = 'manage';
    navigate(`/dashboard/modal/driver/assign/${license}`, {
      state: data
    });
  };
  const handleDelete = async () => {
    selectRef.current.value = 'manage';
    Swal.fire({
      title: 'Are you sure?',
      html: `Driver <b>${data.name}</b> will be deleted.`,
      text: 'This driver will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete!'
    }).then(async (result) => {
      /* istanbul ignore next */
      if (result.isConfirmed) {
        setloading(true);
        try {
          await axios.delete(`/drivers/${id}`);
          setloading(false);
          selectRef.current.innerHTML = `<b className="deleted mx-auto font-bold">Deleted</>`;
        } catch (error) {
          toast('Something went wrong');
          setloading(false);
        }
      }
    });
  };
  const handleChange = (e) => {
    switch (e.target.value) {
      case 'assign':
        return handleAssign();
      case 'perm':
        return handlePermissions();
      case 'edit':
        return handleEdit();
      case 'delete':
        return handleDelete();
      default:
        break;
    }
  };

  return (
    <div className="z-10 font-sm" ref={selectRef}>
      {loading ? (
        <ButtonLoading name="Sending..." />
      ) : (
        <select
          onChange={handleChange}
          name=""
          id="select"
          role="select"
          className="py-1 px-1 font-rale font-bold bg-transparent border rounded-sm"
        >
          <option hidden value="manage">
            Manage
          </option>
          <option value="view">View</option>
          <CheckRole
            children={
              <option
                className="cursor-pointer font-raleway font-bold"
                value="edit"
              >
                Edit
              </option>
            }
            role={['operator']}
          />
          <CheckRole
            children={
              <option className="cursor-pointer" value="delete">
                Delete
              </option>
            }
            role={['operator']}
          />
          <CheckRole
            children={
              <option className="cursor-pointer" value="assign">
                {bus ? 'Change bus' : 'Assign bus'}
              </option>
            }
            role={['operator']}
          />

          <CheckRole
            children={
              <option className="cursor-pointer" value="perm">
                Permissions
              </option>
            }
            role={['admin']}
          />
        </select>
      )}
    </div>
  );
}

export default ManageDropdown;

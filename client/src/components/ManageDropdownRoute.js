import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { axiosBase as axios } from '../utils/Api.js';
import CheckRole from '../utils/CheckRoles.js';
import { ButtonLoading } from './Button.js';

function ManageDropdownRoute({ row }) {
  const selectRef = useRef();
  const { id } = row;
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const handleEdit = () => {
    navigate(`route/edit/${id}`, {
      state: {
        route: row
      }
    });
  };
  const handleView = () => {
    navigate(`/dashboard/modal/routes/view/${id}`, {
      state: {
        route: row
      }
    });
  };
  const handleDelete = async () => {
    const results = await Swal.fire({
      title: 'Are you sure?',
      html: `Route <b>${row.origin}-${row.destination}</b> will be deleted.`,
      text: 'This Route will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete!'
    });
    if (results.isConfirmed) {
      setloading(true);
      try {
        await axios.delete(`/routes/${id}`);
        toast('Route Deleted successfully', { type: 'success' });
        setloading(false);
        if (selectRef.current) {
          selectRef.current.innerHTML = `<p class="font-raleway mx-auto font-bold text-red">Deleted</p>`;
        }
      } catch (error) {
        toast(error.message, { type: 'error' });
        setloading(false);
      }
    }
  };

  const handleChange = (e) => {
    switch (e.target.value) {
      case 'view':
        handleView();
        break;
      case 'edit':
        handleEdit();
        break;
      case 'deleteRoute':
        handleDelete();
        break;
      default:
        break;
    }
  };

  return (
    <div className="z-10" ref={selectRef}>
      {loading ? (
        <ButtonLoading name="Sending" />
      ) : (
        <select
          role="select"
          onChange={handleChange}
          name=""
          id="select"
          className="py-1 px-3 font-rale font-bold bg-transparent border rounded-sm"
        >
          <option hidden> Manage </option>
          <option value="view"> View </option>
          <CheckRole
            children={
              <option className="cursor-pointer" value="edit">
                {' '}
                Edit{' '}
              </option>
            }
            role={['operator']}
          />
          <CheckRole
            children={
              <option className="cursor-pointer" value="deleteRoute">
                {' '}
                Delete{' '}
              </option>
            }
            role={['operator']}
          />{' '}
        </select>
      )}
    </div>
  );
}

export default ManageDropdownRoute;

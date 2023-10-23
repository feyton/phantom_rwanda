import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { axiosBase as axios } from '../../utils/Api.js';
import { ButtonLoading } from '../Button.js';

/* istanbul ignore next */

const BusManagement = ({ row }) => {
  const { plateNumber, busType, seats, driver, route, company, id } =
    row.original;
  const data = {
    plateNumber,
    busType,
    seats,
    driver,
    route,
    company,
    id
  };
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const handleEdit = (busInfo) => {
    navigate(`bus/update/${busInfo.id}`, {
      state: busInfo
    });
  };
  const selectRef = useRef();
  const handleDelete = async (busInfo) => {
    const results = await Swal.fire({
      title: 'Are you sure?',
      html: `Bus <b>${busInfo.plateNumber}</b> will be deleted.`,
      text: 'This driver will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete!'
    });
    if (results.isConfirmed) {
      setloading(true);
      try {
        await axios.delete(`/buses/${busInfo.id}`);
        toast('Bus deleted successfully', { type: 'success' });
        setloading(false);
        selectRef.current.innerHTML = `<p class="mx-auto font-bold text-red font-raleway">Deleted</p>`;
      } catch (error) {
        const errors = error.response.data || error.message;
        toast(errors, { type: 'error' });
      } finally {
        setloading(false);
      }
    }
  };
  const handleAssignRoute = () => {
    navigate(`/dashboard/modal/bus/assign/${plateNumber}`, {
      state: data
    });
  };

  const handleChange = (e) => {
    switch (e.target.value) {
      case 'edit':
        return handleEdit(row.original);
      case 'delete':
        return handleDelete(row.original);
      case 'assign_route':
        return handleAssignRoute(row.original);
    }
  };
  return (
    <div className="z-10" ref={selectRef}>
      {loading ? (
        <ButtonLoading name="Sending" />
      ) : (
        <select
          onChange={handleChange}
          role="select"
          name="busManagement"
          id=""
          className="py-1 px-3 font-rale font-bold bg-transparent border rounded-sm"
        >
          <option hidden>Manage</option>
          <option className="cursor-pointer" value="assign_route">
            Assign Route
          </option>
          <option className="cursor-pointer" value="edit">
            Edit
          </option>
          <option className="cursor-pointer" value="delete">
            Delete
          </option>
        </select>
      )}
    </div>
  );
};

export default BusManagement;

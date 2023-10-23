/* eslint-disable react/jsx-props-no-spreading */
import { ButtonLoading, PrimaryButton } from '@components/Button.js';
import { axiosBase as axios } from '@utils/Api.js';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export const assignBusToDriver = async (plate, driverId) => {
  try {
    await axios.post(`/drivers/${driverId}/bus/${plate}`);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const AssignBusModal = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const { name, email, license, bus, id } = location?.state;
  const onValid = async (data) => {
    const inputPlate = data.plate.toUpperCase();
    try {
      setloading(true);
      const response = await axios.get(`/buses/${inputPlate}/driver`, {
        params: {
          relation: true
        }
      });
      const busExists = response.data.data;
      if (busExists) {
        if (busExists?.id) {
          Swal.fire({
            title: 'Are you sure?',
            text: 'This bus already have a driver!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, change!'
          }).then(async (result) => {
            if (result.isConfirmed) {
              setloading(true);
              await assignBusToDriver(inputPlate, id);
              Swal.fire(
                'Changed!',
                'The bus has been assigned a new driver.',
                'success'
              ).then(() => {
                setloading(false);
                navigate('/dashboard/management');
              });
            }
          });
        } else {
          await assignBusToDriver(inputPlate, id);
          toast('New driver assigned successfully', { type: 'success' });
          navigate('/dashboard/management');
        }
      }
    } catch (error) {
      if (error.response.data) {
        const errorData = error.response.data.data;
        Object.keys(errorData).forEach((key) => {
          toast(`${key}: ${errorData[key]}`, { type: 'error' });
        });
        return;
      }
      toast(error.message);
    } finally {
      setloading(false);
    }
  };
  const errorStyles = 'text-rose-500 mb-2';
  return (
    <div className="font-raleway w-fit px-8 py-2">
      <h1 className="font-bold">Driver Info</h1>
      <hr />
      <ul>
        <li>
          <span>Name: </span>
          <b>{name}</b>
        </li>
        <li>
          <span>Email: </span>
          <b>{email}</b>
        </li>
        <li>
          <span>License: </span>
          <b>{license}</b>
        </li>
        <li>
          <span>Assigned bus: </span>
          <b>{bus?.plateNumber || 'none'}</b>
        </li>
      </ul>
      <hr />
      <div>
        <form
          id="assign-form"
          action="#23"
          className="py-2"
          onSubmit={handleSubmit(onValid)}
        >
          <label htmlFor="plate" className="block font-raleway">
            Bus plate number
          </label>
          <input
            className="bg-gray-300 my-2 border px-2 py-1 rounded-sm placeholder:font-raleway uppercase"
            required
            type="text"
            id="bus-plate"
            name="plate"
            placeholder="RAB1000"
            {...register('plate', {
              required: 'A plate number is required',
              pattern: {
                value: /^(r|R)[A-Za-z]{2}[0-9]{3}[A-Za-z]{1}$/,
                message: 'Invalid plate number'
              }
            })}
          />
          <p className={errorStyles}>{errors?.plate && errors.plate.message}</p>
          {loading ? (
            <ButtonLoading name="Loading..." />
          ) : (
            <PrimaryButton type="submit" name="Assign" />
          )}
        </form>
      </div>
    </div>
  );
};
export default AssignBusModal;

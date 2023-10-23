/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button, { ButtonLoading } from '../Button.js';

/* istanbul ignore next */
const Buses = ({
  formTitle,
  formAction,
  busType,
  company,
  seats,
  plateNumber
}) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange'
  });
  const [loading, setloading] = useState(false);
  const onValid = async (data) => {
    try {
      setloading(true);
      await formAction(data);
      setloading(false);
      navigate(-1);
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
  const inputClassStyles = 'rounded-sm px-3 py-3 mb-2 bg-[#EFEFEF]';
  const errorStyles = 'text-rose-500 mb-2';
  return (
    <div className="px-8 py-4 my-auto font-raleway md:py-8">
      <form
        className="py-8 shadow-main px-4 flex flex-col w-full md:max-w-lg md:mx-auto"
        onSubmit={handleSubmit(onValid)}
      >
        <h1 className="font-extrabold text-2xl pb-8">{formTitle}</h1>
        <label htmlFor="busType" className="font-bold mb-2">
          Bus type
        </label>
        <select
          defaultValue={busType}
          name="busType"
          id="busType"
          {...register('busType', { required: 'Bus type is required' })}
          className={inputClassStyles}
        >
          <option hidden value="">
            Select bus type
          </option>
          <option value="Coaster">Coaster</option>
          <option value="Minibus">Minibus</option>
          <option value="Big Bus">Big Bus</option>
        </select>
        <p className={errorStyles}>
          {errors?.busType && errors.busType.message}
        </p>
        <label htmlFor="busType" className="font-bold mb-2">
          Company
        </label>
        <select
          defaultValue={company}
          name="company"
          id="company"
          className={inputClassStyles}
          {...register('company', { required: 'Company is required' })}
        >
          <option hidden value="">
            Select company
          </option>
          <option value="KBS">Kigali Bus Service</option>
          <option value="Royal express">Royal Express</option>
          <option value="Virunga express">Virunga Express</option>
        </select>
        <p className={errorStyles}>
          {errors?.company && errors.company.message}
        </p>
        <label htmlFor="seats" className="font-bold mb-2">
          Seats
        </label>
        <input
          defaultValue={seats}
          type="number"
          placeholder="Enter number of seats"
          className={inputClassStyles}
          name="seats"
          {...register('seats', {
            required: 'Number of seats is required',
            pattern: {
              value: /^\d*$/,
              message: 'Enter a valid number'
            }
          })}
        />
        <p className={errorStyles}>{errors?.seats && errors.seats.message}</p>
        <label htmlFor="seats" className="font-bold mb-2">
          Plate number
        </label>
        <input
          defaultValue={plateNumber}
          type="text"
          placeholder="Enter plate number"
          className={inputClassStyles}
          name="plateNumber"
          {...register('plateNumber', {
            required: 'Bus plate number is required',
            pattern: {
              value: /^(r|R)[A-Za-z]{2}[0-9]{3}[A-Za-z]{1}$/,
              message: 'Enter a valid plate number'
            }
          })}
        />
        <p className={errorStyles}>
          {errors?.plateNumber && errors.plateNumber.message}
        </p>
        <div className="self-center">
          {loading ? (
            <ButtonLoading name="Sending..." />
          ) : (
            <Button
              name={formTitle}
              styles="bg-primary text-sm text-white py-2 px-3 mt-4"
            />
          )}
        </div>
      </form>
    </div>
  );
};

Buses.defaultProps = {
  busType: undefined,
  company: undefined,
  seats: undefined,
  plateNumber: undefined
};

export default Buses;

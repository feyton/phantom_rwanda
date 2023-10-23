import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ButtonLoading } from '../../components/Button.js';
import { axiosBase as axios } from '../../utils/Api.js';
import { Button } from './AccountRouter.js';

const EM_RGX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function ResetFormPage() {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange'
  });

  const onSubmit = async (data) => {
    try {
      setloading(true);
      await axios.post('/accounts/forgot-password', data);
      navigate('/accounts/reset-email', { state: { email: data.email } });
    } catch (error) {
      toast(error?.response?.data?.data?.message || error.message, {
        type: 'error'
      });
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      <h3 className="text-2xl font-bold text-center py-3 font-rale">
        RESET PASSWORD
      </h3>
      <p className="mb-3 text-sm">
        Enter your email to receive a password reset link
      </p>
      <form id="form" onSubmit={handleSubmit(onSubmit)} role="form">
        <div className="relative w-full">
          <label
            htmlFor="email"
            className="block font-bold mb-2 focus:outline-none required"
          >
            Email:
          </label>
          <input
            name="email"
            type="email"
            id="email"
            placeholder="Your email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: EM_RGX,
                message: 'Invalid email'
              }
            })}
            className={`block w-full rounded-md border-2 placeholder:text-gray-400 placeholder:text-small py-1 px-3 focus:outline-none ${
              !errors.email ? 'border-green-500' : ''
            } ${errors.email ? 'border-red-500' : ''}`}
          />
          <p
            role="alert"
            className={`text-sm text-red-900 font-bold py-1/2 pl-2 ${
              errors.email ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {errors.email && errors.email.message}
          </p>
        </div>
        <div className="flex flex-row justify-between mt-2">
          {loading ? (
            <ButtonLoading name={'Sending'} />
          ) : (
            <Button name={'SUBMIT'} type={'submit'} />
          )}

          <Link to="/">
            <Button
              name={'CANCEL'}
              type={'button'}
              icon={'cancel'}
              styles={'hover:bg-hovercancel bg-cancel hover:transition-all'}
            />
          </Link>
        </div>
      </form>
    </>
  );
}

export default ResetFormPage;

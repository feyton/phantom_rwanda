import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ButtonA as Button, ButtonLoading } from './Button.js';
import LabelComponent from './LabelComponent.js';

export const FormComponent = ({ type, inputs = [], callback, redirect }) => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm();

  const onValid = async (data) => {
    try {
      setloading(true);
      clearErrors();
      await callback(data);
      navigate(redirect);
    } catch (error) {
      /* istanbul ignore next */
      if (error.response.data) {
        const errorData = error.response.data.data;
        Object.keys(errorData).forEach((key) => {
          setError(key, errorData[key]);
          toast(`${key}:${errorData[key]}`, { type: 'error' });
        });
        return;
      }
      toast(error.message);
    } finally {
      setloading(false);
    }
  };
  const inpuStyles =
    'appearance-none border font-raleway rounded w-full py-2 px-3 text-grey-darker bg-gray-200 text-md outline-hidden';

  return (
    <div className="py-0  md:flex md:justify-center pt-3">
      <div className="block bg-white rounded  p-2 w-full lg:max-w-3xl shadow-lg min-h-[70vh] mr-4">
        <div className="py-4 px-8 text-black font-bold lg:px-4 md:px-4 ">
          <h1 className="text-center  text-2xl  font-raleway font-bold md:ml-0 md:text-left">
            {' '}
            {type}
          </h1>
        </div>
        <form onSubmit={handleSubmit(onValid)} id="form">
          <div className="py-4 px-4  w-full  lg:mx-auto ">
            {inputs.map((input, index) => {
              if (input.length > 1) {
                return (
                  <div
                    className="block mb-4 xl:flex md:grid md:grid-cols-2 md:gap-2"
                    key={index}
                  >
                    {input.map((field) => {
                      if (field.type === 'select') {
                        return (
                          <div className="mr-1 xl:w-1/2" key={field.name}>
                            <label
                              htmlFor={field.id}
                              name={field.name}
                              className="block text-grey-darker text-sm font-bold mb-2"
                            >
                              {field.labelName}
                            </label>
                            <select
                              id={field.id}
                              placeholder={field.placeholder}
                              className="appearance-none border rounded w-full py-2 px-3 text-grey-darker bg-gray-200"
                              required
                              {...register(field.name, {
                                required: true
                              })}
                            >
                              {field.options.map((option, index) => {
                                return (
                                  <option
                                    key={option.value || option.id}
                                    value={option.value}
                                    className="text-grey-darker"
                                    hidden={index === 0}
                                  >
                                    {' '}
                                    {option.name}{' '}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        );
                      }
                      return (
                        <div className="ml-1 xl:w-1/2 " key={field.id}>
                          <div className="mb-2 block font-raleway">
                            <LabelComponent
                              htmlFor={field.id}
                              name={field.labelName}
                            />
                            <input
                              type={field.type || 'text'}
                              name={field.name}
                              className={inpuStyles}
                              placeholder={field.placeholder || field.name}
                              id={field.id}
                              {...register(field.name, {
                                required: `${field.name} is required`,
                                pattern: {
                                  value: field.pattern,
                                  message: `${field.message}`
                                }
                              })}
                            />
                          </div>

                          <p className="text-red-800">
                            {errors && errors[field.name] && field.message}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                );
              }
              const field = input[0];
              return (
                <div className="mb-4" key={field.id}>
                  <div className="w-full mr-3 flex flex-col">
                    <LabelComponent htmlFor={field.id} name={field.labelName} />
                    <input
                      type={field.type || 'text'}
                      name={field.name}
                      className={inpuStyles}
                      placeholder={field.placeholder || field.name}
                      id={field.name}
                      {...register(`${field.name}`, {
                        required: `${field.name} is required`,
                        pattern: {
                          value: field.pattern,
                          message: `${field.message}`
                        }
                      })}
                    />

                    <p className="text-red-800">
                      {errors && errors[field.name] && field.message}
                    </p>
                  </div>
                </div>
              );
            })}

            <div className="flex justify-center align">
              {loading ? (
                <ButtonLoading name="Sending..." />
              ) : (
                <Button name={type} type="submit" id="btn" />
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormComponent;

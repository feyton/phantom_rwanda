import React from 'react';
import { useForm } from 'react-hook-form';
import bus2 from '../assets/bus2.jpg';
import Button from '../components/Button.js';
import Input from '../components/Input.js';

const UpdateDriver = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  return (
    <div>
      <div className="flex lg:mx-24 xl:mx-24 border rounded-xl my-8">
        <div>
          <img
            src={bus2}
            alt="bus"
            className="hidden lg:flex xl:flex h-full rounded-l-xl object-cover"
          />
        </div>
        <div className="mx-12 w-full">
          <h1 className="font-raleway font-bold my-8 text-2xl">
            Update Driver Profile
          </h1>
          <form
            onSubmit={handleSubmit()}
            className="flex flex-col items-center"
          >
            <div className="flex flex-col lg:flex-row xl:flex-row">
              <div className="lg:mr-4 xl:mr-4 lg:w-96 xl:w-96">
                <Input
                  labelName="First Name"
                  placeholder="Enter the first name"
                  type="text"
                  name="firstName"
                  {...register('firstName', {
                    required: 'First name is required',
                    pattern: /^[a-zA-Z][a-zA-Z ]{3,32}$/i
                  })}
                />
                <div className="h-8">
                  {errors.firstName && (
                    <p className="mb-4 error-message required">
                      A valid firstname is required
                    </p>
                  )}
                </div>
                <Input
                  labelName="mobile number"
                  placeholder="Enter the mobile number"
                  type="text"
                  name="mobileNumber"
                  {...register('mobileNumber', {
                    required: 'Mobile number is required',
                    pattern: /(0|7|8)\d{9}$/
                  })}
                />
                <div className="h-8">
                  {errors.mobileNumber && (
                    <p className="mb-4 error-message required">
                      Invalid mobile number
                    </p>
                  )}
                </div>

                <Input
                  labelName="Address"
                  placeholder="Enter the address"
                  type="text"
                  name="address"
                  {...register('address', {
                    required: 'address is required',
                    pattern: /^(?!.* {2})[a-z][a-z ]{3,}/i
                  })}
                />
                <div className="h-8">
                  {errors.address && (
                    <p className="mb-4 error-message required">
                      Invalid address
                    </p>
                  )}
                </div>
              </div>
              <div className="lg:ml-4 xl:ml-4 lg:w-96 xl:w-96">
                <Input
                  labelName="Last name"
                  placeholder="Enter the Last name"
                  type="text"
                  name="lastName"
                  {...register('lastName', {
                    required: 'Last name is required',
                    pattern: /^[a-zA-Z][a-zA-Z ]{3,32}$/i
                  })}
                />
                <div className="h-8">
                  {errors.lastName && (
                    <p className="mb-4 error-message required">
                      A valid last name is required
                    </p>
                  )}
                </div>
                <div className="mb-2 block font-raleway">
                  <label
                    htmlFor="Company"
                    className="block text-grey-darker text-sm font-bold font-rale  mb-2"
                  >
                    Company
                  </label>
                  <select
                    id="company"
                    name="company"
                    {...register('company')}
                    className="border font-rale rounded w-full py-2 px-3 text-grey-darker bg-gray-200 text-md outline-hidden mb-1"
                  >
                    <option hidden>Select Company</option>
                    <option value="RFTC">RFTC</option>
                    <option value="KBS">KBS</option>
                    <option value="ROY">Royal</option>
                  </select>
                </div>
                <div className="h-8">
                  {errors.company && (
                    <p className="error-message required">
                      Company name is required
                    </p>
                  )}
                </div>
                <Input
                  labelName="National ID"
                  placeholder="Enter the National ID"
                  type="text"
                  name="nationalID"
                  {...register('nationalID', {
                    required: 'National ID is required',
                    pattern: /^[1-3](19|20)\d{2}[7-8]\d{7}[0-9]\d{2}$/
                  })}
                />
                <div className="h-8">
                  {errors.nationalID && (
                    <p className="error-message required">
                      A valid national ID is required
                    </p>
                  )}
                </div>
              </div>
            </div>
            <Input
              labelName="Driver license"
              placeholder="Enter the Driver license"
              type="text"
              name="driverLicense"
              {...register('driverLicense', {
                required: 'Driver License is required',
                pattern: /^[1-3](19|20)\d{2}[7-8]\d{7}[0-9]\d{2}$/
              })}
            />
            <div className="h-8">
              {errors.driverLicense && (
                <p className="mb-4 error-message required">
                  A valid driver license is required
                </p>
              )}
            </div>
            <Button
              name="Update"
              styles="bg-primary mb-8 text-background py-2"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateDriver;

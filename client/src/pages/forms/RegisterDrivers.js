import { FormComponent } from '@components/FormComponent.js';
import { axiosBase as axios } from '@utils/Api.js';
import React from 'react';
import { toast } from 'react-toastify';
import { driverInputs } from './FormInputs.js';

const registerDriverToDB = async (data) => {
  try {
    await axios.post('/drivers', data);
    return toast('Driver registered successful', { type: 'success' });
  } catch (error) {
    return Promise.reject(error);
  }
};
function RegisterDriver() {
  return (
    <FormComponent
      inputs={driverInputs}
      redirect="/dashboard/management"
      callback={registerDriverToDB}
      type="Register Driver"
    />
  );
}

export default RegisterDriver;

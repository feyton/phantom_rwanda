import React from 'react';
import { toast } from 'react-toastify';
import FormComponent from '@components/FormComponent.js';
import { axiosBase as axios } from '@utils/Api.js';
import { operatorInputs } from './FormInputs.js';

const registerOperatorToDB = async (data) => {
  try {
    await axios.post('/operators', data);
    return toast('Operator registered successfully', { type: 'success' });
  } catch (error) {
    return Promise.reject(error);
  }
};

function RegisterOperator() {
  return (
    <FormComponent
      inputs={operatorInputs}
      type="Register Operator"
      callback={registerOperatorToDB}
      redirect="/dashboard/management"
    />
  );
}

export default RegisterOperator;

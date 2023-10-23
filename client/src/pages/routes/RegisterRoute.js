import React from 'react';
import { toast } from 'react-toastify';
import { axiosBase as axios } from '../../utils/Api.js';
import RouteComponent from './components/RouteComponent.js';

function RegisterRoute() {
  const registerRouteToDB = async (data) => {
    try {
      await axios.post('/routes', data);
      toast('Route Created successfully', { type: 'success' });
      return;
    } catch (error) {
      return Promise.reject(error);
    }
  };
  return (
    <RouteComponent formAction={registerRouteToDB} formTitle="Register Route" />
  );
}

export default RegisterRoute;

import React from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Buses from '../components/forms/Buses.js';
import { axiosBase as axios } from '../utils/Api.js';

const UpdateBus = () => {
  const location = useLocation();
  const { id, busType, plateNumber, company, seats } = location.state;
  /* istanbul ignore next */
  const updateBusInDB = async (newBusInfo) => {
    try {
      await axios.put(`/buses/${id}`, newBusInfo);
      toast('Bus updated successfully', { type: 'success' });
      return;
    } catch (error) {
      return Promise.reject(error);
    }
  };
  return (
    <Buses
      formTitle="Update bus"
      formAction={updateBusInDB}
      busType={busType}
      company={company}
      seats={seats}
      plateNumber={plateNumber}
    />
  );
};

export default UpdateBus;

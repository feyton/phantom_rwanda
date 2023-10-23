import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { axiosBase as axios } from '../../utils/Api.js';
import RouteComponentEdit from './components/RouteComponentEdit.js';

const RouteEdit = () => {
  const location = useLocation();
  const routeInfo = location.state?.route;
  const { id } = useParams();
  const handleEdit = async (data) => {
    try {
      await axios.put(`/routes/${id}`, data);
      toast('Route updated successfully', { type: 'success' });
      return;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return (
    <RouteComponentEdit
      formAction={handleEdit}
      formTitle="Update Route"
      instance={routeInfo}
    />
  );
};

export default RouteEdit;

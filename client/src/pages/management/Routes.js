import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import TableSkeleton from '../../components/SkeletonUIs/TableSkeleton.js';
import { axiosBase as axios } from '../../utils/Api.js';
import RouteTable from '../routes/components/RouteTable.js';

const Routes = () => {
  const [routes, setroutes] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const response = await axios.get('/routes');
        setroutes(response.data.data);
      } catch (error) {
        toast(error.message);
      } finally {
        setloading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div>{!loading ? <RouteTable data={routes} /> : <TableSkeleton />}</div>
  );
};

export default Routes;

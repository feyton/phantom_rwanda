import { axiosBase as axios } from '@utils/Api.js';
import React, { Suspense, useEffect, useState } from 'react';
import TableSkeleton from '../../components/SkeletonUIs/TableSkeleton.js';

const DriversTable = React.lazy(() =>
  import('../../components/DriversTable.js')
);

const Drivers = () => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setloading(true);
      const response = await axios.get('/drivers', {
        params: {
          relation: true
        }
      });
      setdata(response.data.data);
      setloading(false);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Suspense fallback={<TableSkeleton />}>
        {!loading ? <DriversTable data={data} /> : <TableSkeleton />}
      </Suspense>
    </div>
  );
};

export default Drivers;

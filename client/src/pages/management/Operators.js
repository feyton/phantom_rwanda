import { axiosBase as axios } from '@utils/Api.js';
import React, { Suspense, useEffect, useState } from 'react';
import TableSkeleton from '../../components/SkeletonUIs/TableSkeleton.js';
import RouteTable from '../routes/components/RouteTable.js';

const OperatorsTable = React.lazy(() =>
  import('../../components/OperatorsTable.js')
);

const Operators = () => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setloading(true);
      const response = await axios.get('/operators');
      setdata(response.data.data);
      setloading(false);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Suspense fallback={<TableSkeleton />}>
        {!loading ? <OperatorsTable data={data} /> : <TableSkeleton />}
      </Suspense>
    </div>
  );
};
RouteTable;

export default Operators;

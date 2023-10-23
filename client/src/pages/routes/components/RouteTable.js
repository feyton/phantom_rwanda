import React, { useEffect, useState } from 'react';
import ManageDropdown from '../../../components/ManageDropdownRoute.js';
import ManagementTable from '../../../components/ManagementTable.js';
import TableSkeleton from '../../../components/SkeletonUIs/TableSkeleton.js';
import { axiosBase as axios } from '../../../utils/Api.js';

const tableColumns = [
  {
    Header: 'Destination 1',
    accessor: 'origin'
  },
  {
    Header: 'Destination 2',
    accessor: 'destination'
  },
  {
    Header: 'Distance',
    accessor: 'distance'
  },
  {
    Header: 'Management',
    accessor: 'management',
    Cell: ({ row }) => <ManageDropdown row={row.original} />
  }
];

const RouteTable = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setloading(true);
      const response = await axios.get('/routes');
      setRoutes(response.data.data);
      setloading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      {!loading ? (
        <ManagementTable
          tableColumns={tableColumns}
          data={routes}
          searchPlaceholder="Search routes..."
          registerNewPath="route/register"
        />
      ) : (
        <TableSkeleton />
      )}
    </>
  );
};

export default RouteTable;

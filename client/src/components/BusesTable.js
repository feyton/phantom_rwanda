import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { axiosBase as axios } from '../utils/Api.js';
import { ButtonA } from './Button.js';
import BusManagement from './dropdowns/BusManagement.js';
import ManagementTable from './ManagementTable.js';
import TableSkeleton from './SkeletonUIs/TableSkeleton.js';

const DriverLink = ({ row }) => {
  if (row.driver) {
    return (
      <div>{`${row.driver.user.firstName} ${row.driver.user.lastName}`}</div>
    );
  }
  return <div className="text-red">No driver</div>;
};

const RouteLink = ({ row }) => {
  if (row.route) {
    return (
      <div>
        {row.route.origin} - {row.route.destination}
      </div>
    );
  }
  return <div className="text-red">No route assigned</div>;
};

const busesTableColumns = [
  {
    Header: 'Plate number',
    accessor: 'plateNumber'
  },
  {
    Header: 'Bus type',
    accessor: 'busType'
  },
  {
    Header: 'Seats',
    accessor: 'seats'
  },
  {
    Header: 'Driver',
    Cell: ({ row }) => <DriverLink row={row.original} />
  },
  {
    Header: 'Route',
    Cell: ({ row }) => <RouteLink row={row.original} />
  },
  {
    Header: 'Management',
    Cell: ({ row }) => <BusManagement row={row} />
  }
];

const BusesTable = () => {
  const [buses, setbuses] = useState();
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const response = await axios.get('/buses', {
          params: {
            relation: true
          }
        });
        setbuses(response.data.data);
      } catch (error) {
        toast(error?.response?.data?.data?.message);
      } finally {
        setloading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {!loading ? (
        buses ? (
          <ManagementTable
            tableColumns={busesTableColumns}
            data={buses}
            searchPlaceholder="Search buses..."
            registerNewPath="bus/register"
          />
        ) : (
          <div className="flex  content-center flex-col">
            <h1 className="font-bold font-raleway text-red">Error occured</h1>
            <ButtonA
              name="Try again"
              onClick={() => window.location.reload()}
            />
          </div>
        )
      ) : (
        <TableSkeleton />
      )}
    </>
  );
};
export default BusesTable;

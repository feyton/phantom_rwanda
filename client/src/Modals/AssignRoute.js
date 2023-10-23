import { ButtonLoading, PrimaryButton } from '@components/Button.js';
import { axiosBase as axios } from '@utils/Api.js';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export const assignRouteToBus = async (data) => {
  try {
    await axios.post(`/bus-to-routes/${data.plateNumber}/${data.route}`);
    return true;
  } catch (error) {
    toast('Something went wrong on our end');
  }
};

export const AssignRouteModal = ({ handleClose }) => {
  const navigate = useNavigate();
  const [routes, setRoutes] = useState();
  const [loading, setloading] = useState(false);
  const location = useLocation();
  const { plateNumber, busType, seats, route, id } = location?.state;
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      plateNumber,
      route: e.target.route.value
    };
    try {
      setloading(true);
      if (route) {
        Swal.fire({
          title: 'Are you sure?',
          text: 'This bus already have a route!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Assign route!'
        }).then(async (result) => {
          if (result.isConfirmed) {
            await assignRouteToBus(data);
            Swal.fire(
              'Done!',
              'The bus has been assigned a new route.',
              'success'
            ).then(() => {
              navigate('/dashboard/management');
            });
          }
        });
      } else {
        await assignRouteToBus(data);
        toast('The bus has been assigned a new route.', { type: 'success' });
        navigate('/dashboard/management');
      }
    } catch (error) {
      toast(error?.response?.data?.data?.message);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const response = await axios.get('/routes');
        setRoutes(response.data.data);
      } catch (error) {
        toast(error?.response?.data?.data?.message);
      } finally {
        setloading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="font-raleway w-fit px-8 py-2">
      <h1 className="font-bold">Bus Info</h1>
      <hr />
      <ul>
        <li>
          <span>Plate: </span>
          <b>{plateNumber}</b>
        </li>
        <li>
          <span>Type: </span>
          <b>{busType}</b>
        </li>
        <li>
          <span>Seats: </span>
          <b>{seats}</b>
        </li>
        <li>
          <span>Assigned route: </span>
          <b>
            {route?.origin} - {route?.destination}
          </b>
        </li>
      </ul>
      <hr />
      <div>
        <form
          id="assign-form"
          action="#23"
          className="py-2"
          onSubmit={onSubmit}
        >
          <label htmlFor="bus" className="block font-raleway">
            Route:{' '}
          </label>
          <select
            className="bg-gray-300 my-2 border px-2 py-1 rounded-sm placeholder:font-raleway uppercase"
            required
            type="text"
            id="bus-route"
            name="route"
          >
            <option id="origin-select">Select route</option>
            {routes &&
              routes.map((route) => {
                return (
                  <option
                    value={route.code}
                    key={route.code}
                    className="cursor-pointer bg-transparent font-bold font-raleway disabled:text-gray-400 disabled:bg-gray-100"
                  >
                    {route.origin} - {route.destination}
                  </option>
                );
              })}
          </select>
          {loading ? (
            <ButtonLoading name="Loading..." />
          ) : (
            <PrimaryButton type="submit" name="Assign" />
          )}
        </form>
      </div>
    </div>
  );
};
export default AssignRouteModal;

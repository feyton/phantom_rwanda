/* eslint-disable jsx-a11y/label-has-associated-control */
// import
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-routing-machine';
import React, { useState } from 'react';
import { LayersControl } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button, { ButtonLoading } from '../../../components/Button.js';

const provider = new OpenStreetMapProvider();

const getFormData = (form) => {
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  return data;
};

const inpuStyles =
  'appearance-none border font-raleway rounded w-full py-2 px-3 text-grey-darker bg-gray-200 text-md outline-hidden';

const RouteComponent = ({ formTitle, formAction, instance }) => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const data = getFormData(e.target);
      await formAction(data);
      navigate(-1);
    } catch (error) {
      const validationErrors = error.response.data.data;
      if (validationErrors) {
        if (validationErrors instanceof Object) {
          for (let field in validationErrors) {
            toast(`${field}: ${validationErrors[field]}`, {
              type: 'error'
            });
          }
          return;
        }
        toast(validationErrors, { type: 'error' });
        return;
      }
      toast(error.message, { type: 'error' });
    } finally {
      setloading(false);
    }
  };

  return (
    <div className='w-full'>
      <form
        onSubmit={handleSubmit}
        className="p-8 shadow-main px-4 flex flex-col w-full md:max-w-lg md:mx-auto"
      >
        <h1 className="font-bold text-xl pb-8 text-center "> {formTitle} </h1>
        <div className="block mb-2">
          <label
            htmlFor="origin"
            className="block text-grey-darker text-sm font-bold mb-2"
          >
            Origin:
          </label>

          <input
            defaultValue={instance.origin}
            name="origin"
            required
            className={inpuStyles}
          />
        </div>
        <div>
          <label
            htmlFor="destination"
            name="distance"
            className="block text-grey-darker text-sm font-bold mb-2"
          >
            Destination
          </label>
          <input
            defaultValue={instance.destination}
            required
            type="text"
            className={inpuStyles}
            name="destination"
          />
        </div>
        <div>
          <label
            htmlFor="distance"
            name="distance"
            className="block text-grey-darker text-sm font-bold mb-2"
          >
            Distance
          </label>
          <input
            defaultValue={instance.distance}
            required
            type="number"
            className={inpuStyles}
            name="distance"
          />
        </div>

        <div className="self-center mt-6">
          {loading ? (
            <ButtonLoading name="Sending" />
          ) : (
            <Button
              name={formTitle}
              styles="bg-primary text-sm text-white py-2 px-3 hover:bg-hover"
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default RouteComponent;

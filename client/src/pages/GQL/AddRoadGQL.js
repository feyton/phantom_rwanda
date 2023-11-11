import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const GET_INFO = gql`
  query Query {
    getBusParks {
      id
      name
    }
    getBusStops {
      name
      id
      details
    }
  }
`;
const ADD_ROAD = gql`
  mutation Mutation($input: RoadInput) {
    createRoad(input: $input) {
      code
      details
    }
  }
`;
function AddRoadGQL() {
  const [busParkSelection, setBusParkSelection] = useState('');
  const [anotherBusParkSelection, setAnotherBusParkSelection] = useState('');
  const [busStopsSelection, setBusStopsSelection] = useState([]);
  const [addRoad, { loading }] = useMutation(ADD_ROAD);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();
  const data = useQuery(GET_INFO);
  if (!data || data?.loading)
    return (
      <>
        <div>Loading</div>
      </>
    );
  const handleBusParkSelectionChange = (event) => {
    setBusParkSelection(event.target.value);
  };

  // Handler for the second select input (Another Bus Parks)
  const handleAnotherBusParkSelectionChange = (event) => {
    setAnotherBusParkSelection(event.target.value);
  };

  // Handler for the bus stops selection
  const handleBusStopsChange = (selectedOptions) => {
    setBusStopsSelection(selectedOptions);
  };

  const onSubmit = (data) => {
    console.log(data);
    addRoad({
      variables: {
        input: { ...data, fare: parseInt(data.fare) }
      },
      onCompleted: (data) => {
        toast.toast('Road Added');
        reset();
      }
    });
  };

  console.log(data);
  return (
    <div className="flex flex-col items-left gap-2 w-md mx-auto mt-10 pb-10">
      <h2 className="text-3xl font-bold mb-2">Add New Road</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="flex flex-col my-2">
          Bus Park Selection:
          <select
            {...register('park1')}
            value={busParkSelection}
            onChange={handleBusParkSelectionChange}
          >
            <option value="">Select a bus park</option>
            {data.data.getBusParks.map((busPark) => (
              <option key={busPark.id} value={busPark.id}>
                {busPark.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col my-2">
          Another Bus Park Selection:
          <select
            {...register('park2')}
            value={anotherBusParkSelection}
            onChange={handleAnotherBusParkSelectionChange}
          >
            <option value="">Select another bus park</option>
            {data.data.getBusParks.map((busPark) => (
              <option key={busPark.id} value={busPark.id}>
                {busPark.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col my-2">
          Bus Stops Selection:
          <select
            multiple
            {...register('busStopsIds')}
            value={busStopsSelection}
            onChange={(e) =>
              handleBusStopsChange(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
          >
            {data.data.getBusStops.map((busStop) => (
              <option key={busStop.id} value={busStop.id}>
                {busStop.name}
              </option>
            ))}
          </select>
        </label>
        <div className="flex flex-col gap-3">
          <input
            {...register('name')}
            type="text"
            name="name"
            placeholder="Name"
            className="py-1 px-2 border border-primary"
          />
          <input
            {...register('code')}
            type="text"
            name="code"
            placeholder="Code"
            className="py-1 px-2 border border-primary"
          />
          <input
            type="number"
            {...register('fare')}
            name="fare"
            placeholder="Transport fare"
            className="py-1 px-2 border border-primary"
          />
          <textarea
            name="details"
            {...register('details')}
            placeholder="The road details"
            id=""
            cols="30"
            rows="3"
          ></textarea>
          <button type="submit" className="btn btn-outline-primary">
            Submit
          </button>
        </div>
      </form>

      {/* Additional UI elements can be added, such as a submit button, etc. */}
    </div>
  );
}

export default AddRoadGQL;

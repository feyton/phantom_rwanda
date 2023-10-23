/* eslint-disable no-restricted-globals */
import { axiosBase } from '@utils/Api.js';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { ButtonLoading } from '../../components/Button.js';
import {
  setEntityId,
  setIntervalId,
  setPassengers
} from '../../redux/reducers/busMovementReducer.js';
import socket from '../../utils/socket.js';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function BusMovement({ bus }) {
  const [loading, setloading] = useState(false);
  const [coordinates, setCoordinates] = useState();
  const dispatch = useDispatch();
  const { entityId, passengers, seats, inProgress, intervalId } = useSelector(
    (state) => state?.movement
  );

  let locationHistory = JSON.parse(localStorage.getItem('progres')) || [];

  const handleStart = async () => {
    if (coordinates) {
      toast('You are already on you way');
      return;
    }

    const { value: onboard } = await Swal.fire({
      title: 'Initial passengers',
      icon: 'question',
      input: 'number',
      inputLabel: 'Passengers in the bus',
      inputValue: parseInt(passengers, 10),
      inputAttributes: {
        min: 0,
        max: 120,
        step: 3
      },
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value || isNaN(value)) {
          if (passengers) {
            return Promise.resolve(passengers);
          }
          return 'You need to specify passengers in number';
        }
        if (value > seats) {
          return `You exceed the number of seats in the bus ${seats}`;
        }
      }
    });
    if (onboard) {
      dispatch(setPassengers(onboard));
      try {
        setloading(true);
        const res = await axiosBase.post('/simulate', { passengers: onboard });
        let { num } = res.data.data.bus;
        const coors = res.data.data.coordinates;
        const rd = getRandomInt(1, 9);
        let coor;
        if (rd % 2 === 0) {
          coor = coors;
        } else {
          coor = coors.reverse();
        }

        dispatch(setEntityId(res.data?.data?.bus?.entityId));
        const serverId = res.data?.data?.bus?.entityId;
        let useLocation, locWatch;
        if ('geolocation' in navigator) {
          useLocation = confirm(
            'Your browser support using real time location. If you want to use that press ok else press cancel'
          );
        }
        if (useLocation) {
          console.log('Using location');
          locWatch = navigator.geolocation.watchPosition(
            (position) => {
              const locObj = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              console.log(locObj);
              socket.emit('location_update', {
                bus,
                id: serverId,
                num,
                location: locObj
              });
              setCoordinates(locObj);
              const loc = {
                position: {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude
                },
                accuracy: position.coords.accuracy,
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                sentAt: position.timestamp
              };
              locationHistory.push(loc);
            },
            (err) => {
              console.log(err);
            },
            {
              maximumAge: 0,
              enableHighAccuracy: true
            }
          );
        } else {
          const locationUpdate = setInterval(() => {
            if (num > coor.length - 2) {
              socket.emit('finished', {
                id: serverId,
                bus,
                code: bus.route.code,
                history: locationHistory
              });
              clearInterval(locationUpdate);
              setCoordinates(null);
              setTimeout(() => {
                location.reload();
              }, 2000);
              return;
            }
            num++;
            setCoordinates(JSON.parse(coor[num]));
            socket.emit('location_update', {
              bus,
              id: serverId,
              num,
              location: JSON.parse(coor[num])
            });
          }, 2000);

          inProgress
            ? toast('Trip resumed', { type: 'info' })
            : toast('Trip started', { type: 'info' });

          dispatch(setIntervalId(locationUpdate));
        }
      } catch (error) {
        toast(error.message);
      } finally {
        setloading(false);
      }
    }
  };

  const handleAlert = async () => {
    const { value: alighted } = await Swal.fire({
      title: 'Passengers alighted',
      input: 'number',
      inputLabel: 'Passengers left the bus',
      showCancelButton: true,
      inputAttributes: {
        min: 0,
        max: 120,
        step: 3
      },
      inputValidator: (value) => {
        if (!value || isNaN(value)) {
          return 'You need to specify passengers in number';
        }
        if (passengers - value < 0) {
          return `You exceed the number of passengers in the bus ${passengers}`;
        }
      }
    });
    const { value: boarded } = await Swal.fire({
      title: 'Passengers boarded',
      input: 'number',
      inputLabel: 'Passengers who entered the bus',
      showCancelButton: true,
      inputAttributes: {
        min: 0,
        max: 120,
        step: 3
      },
      // eslint-disable-next-line consistent-return
      inputValidator: (value) => {
        dispatch(setPassengers(passengers - alighted));
        if (!value || isNaN(value)) {
          return 'You need to specify passengers';
        }
        if (passengers + boarded > seats) {
          return `You are exceeding bus capacity of ${seats}. Only ${
            seats - passengers
          } seats are empty`;
        }
      }
    });

    if (entityId) {
      if (alighted && boarded) {
        socket.emit('bus_alert', {
          bus,
          boarded,
          alighted,
          code: bus.route.code,
          id: entityId,
          passengers
        });
      }
    }
  };

  const handleStop = async () => {
    Swal.fire({
      title: 'Are you sure?',
      html: `This will stop sending the updates`,
      text: 'This will stop sending the updates',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, stop!'
    }).then(async (result) => {
      if (result.isConfirmed && entityId) {
        try {
          socket.emit('finished', {
            id: entityId,
            bus,
            code: bus.route.code,
            history: locationHistory
          });
          toast('Trip has been marked as complete');
          if (intervalId) {
            clearInterval(intervalId);
          }
        } catch (error) {
          toast('Something went wrong');
        } finally {
          setTimeout(() => {
            location.reload();
          }, 2000);
        }
      }
    });
  };

  return (
    <div>
      <h2 className="font-bold text-center font-raleway">Bus Controls</h2>
      {inProgress && (
        <h3 className="py-2 px-3 font-raleway w-fit my-2 font-bold text-center bg-gray-300 text-primary mx-auto">
          You had a trip in progress
        </h3>
      )}
      <div className="flex flex-row justify-center">
        {!coordinates && (
          <>
            {loading ? (
              <ButtonLoading name="sending..." styles="mx-3" />
            ) : (
              <button
                onClick={(e) => handleStart(e)}
                className="py-1 px-3 bg-primary mx-3 text-white rounded-md font-raleway font-bold"
              >
                {inProgress ? 'RESUME' : 'START'}
              </button>
            )}
          </>
        )}

        {coordinates || inProgress ? (
          <>
            {coordinates && (
              <>
                {loading ? (
                  <ButtonLoading
                    styles="bg-yellow-800 mx-3"
                    name="Sending..."
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => handleAlert()}
                    className="py-1 px-3 bg-yellow-900 mx-3 text-white rounded-md font-raleway font-bold"
                  >
                    ALIGHT
                  </button>
                )}
              </>
            )}
            {loading ? (
              <ButtonLoading styles="bg-red mx-3" name="Loading..." />
            ) : (
              <button
                type="button"
                onClick={() => {
                  handleStop();
                }}
                className="py-1 px-3 bg-red mx-3 text-white rounded-md font-raleway font-bold"
              >
                FINISH
              </button>
            )}
          </>
        ) : (
          ''
        )}
      </div>
      {coordinates && (
        <div>
          <h3 className="font-bold font-raleway ">Live Updates</h3>
          <hr />
          <p>
            Current lat:{' '}
            <span className="font-bold font-raleway text-primary">
              {coordinates.lat}
            </span>{' '}
          </p>
          <p>
            Current lng:{' '}
            <span className="font-bold font-raleway text-primary">
              {coordinates.lng}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default BusMovement;

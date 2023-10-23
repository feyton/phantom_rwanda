import L from 'leaflet';
import React, { useEffect, useRef, useState } from 'react';
import {
  LayersControl,
  MapContainer,
  TileLayer,
  ZoomControl
} from 'react-leaflet';
import { toast } from 'react-toastify';
import Button, { ButtonLoading } from '../components/Button.js';
import { axiosBase } from '../utils/Api.js';
import socket from '../utils/socket.js';
import ActiveBuses from './ActiveBuses.js';
import RoutingMachine from './RoutingMachine.js';

const TrackingPage = () => {
  const [options, setoptions] = useState([]);
  const [loading, setloading] = useState(false);
  const [activeRoute, setActiveRoute] = useState();
  const { BaseLayer } = LayersControl;
  const rMachine = useRef();

  const handleRoute = async (e) => {
    e.preventDefault();
    options.filter((option) => {
      const route = option.code === e.target.origin.value;
      if (route) {
        setloading(true);
        if (rMachine.current) {
          socket.emit('leave_room', {
            code: activeRoute.code
          });
          rMachine.current.setWaypoints([
            L.latLng(option.start),
            L.latLng(option.end)
          ]);
          rMachine.current.on('routeselected', () => {
            setloading(false);
          });
        } else {
          setActiveRoute(option);
          setloading(false);
        }
      }
    });
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setloading(true);
        const res = await axiosBase.get('/simulate/options');
        setoptions(res.data.data.options);
      } catch (error) {
        toast('Something went wrong on the server', { type: 'error' });
      } finally {
        setloading(false);
      }
    };
    fetchOptions();
  }, []);

  useEffect(() => {
    if (activeRoute) {
      socket.emit('join_room', {
        code: activeRoute.code
      });
    }
  }, [activeRoute]);

  return (
    <div className="flex flex-col">
      <form
        id="form"
        onSubmit={handleRoute}
        className="fixed z-20 flex flex-col justify-center"
      >
        <div className="flex flex-col bg-background p-4 rounded-xl mt-2 ml-6 md:ml-10 ">
          <select
            type="text"
            id="origin"
            name="origin"
            placeholder="your current location"
            className="rounded-xl bg-background border-primary text-sm outline-none mb-2 pl-4 md:pl-8 py-1  w-40 md:w-56 border-2"
          >
            <option id="origin-select">Select route</option>
            {options.map((option) => {
              return (
                <option
                  value={option.code}
                  key={option.code}
                  className="cursor-pointer bg-transparent font-bold font-raleway disabled:text-gray-400 disabled:bg-gray-100"
                >
                  {`${option.origin} - ${option.destination}`}
                </option>
              );
            })}
          </select>
          <div type="submit" className="flex justify-center">
            {loading ? (
              <ButtonLoading name="Loading..." />
            ) : (
              <Button
                name="Track"
                styles="bg-primary text-sm text-background py-1"
              />
            )}
          </div>
        </div>
      </form>
      <div className="flex flex-col items-center z-10">
        <MapContainer
          center={{ lat: -1.936671, lng: 30.053524 }}
          zoom={13}
          zoomControl={false}
          className="h-screen md:h-[88vh] w-[95vw]"
        >
          <LayersControl>
            <BaseLayer checked name="Open Street">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </BaseLayer>
            <BaseLayer name="Google Sattelite">
              <TileLayer
                url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                maxZoom={20}
                subdomains={['mt1', 'mt2', 'mt3']}
              />
            </BaseLayer>
          </LayersControl>

          <ActiveBuses />
          <ZoomControl position="topright" />

          {options && activeRoute ? (
            <RoutingMachine
              ref={rMachine}
              origin={activeRoute.start}
              destination={activeRoute.end}
            />
          ) : (
            ''
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default TrackingPage;

// TODO To calculate the use distance
// if (userLocation && buses) {
//   let distances = [];
//   let loc = JSON.parse(userLocation);
//   buses.slice().filter(item=>item.route === activeRoute.code)
//     .forEach((bus) => {
//       const origin = [loc.lat, loc.lng];
//       const dest = [bus.location.latitude, bus.location.longitude];
//       const distance = getDistance(origin, dest);
//       distances.push({ id: bus.entityId, distance, bus });
//     });
//   const nearBus = distances
//     .sort((a, b) => {
//       return a.distance - b.distance;
//     })
//     .filter((item, index, array) => item.distance === array[0].distance)[0];
//   console.log(nearBus);
// }

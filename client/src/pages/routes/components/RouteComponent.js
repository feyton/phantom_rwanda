/* eslint-disable jsx-a11y/label-has-associated-control */
import L from 'leaflet';
// import
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-routing-machine';
import 'leaflet.marker.slideto';
import React, { useEffect, useRef, useState } from 'react';
import {
  LayersControl,
  MapContainer,
  TileLayer,
  ZoomControl
} from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import activeBusIcon from '../../../assets/activeBus.jpg';
import userLocationIcon from '../../../assets/userLocationIcon.png';
import Button, { ButtonLoading } from '../../../components/Button.js';
import RouteCoordinates from './RouteCoordinates.js';

const provider = new OpenStreetMapProvider({
  params: {
    countrycodes: 'rw',
    'accept-language': 'en'
  }
});

const getFormData = (form) => {
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  return data;
};

const locationIcon = L.icon({
  iconUrl: activeBusIcon,
  iconSize: [30, 40]
});

const userLocationIc = L.icon({
  iconUrl: userLocationIcon,
  iconSize: [20, 40]
});

const inpuStyles =
  'appearance-none border font-raleway rounded w-full py-2 px-3 text-grey-darker bg-gray-200 text-md outline-hidden';

const RouteComponent = ({ formTitle, formAction }) => {
  const navigate = useNavigate();
  const [origin, setOrigin] = useState(null);
  const [map, setMap] = useState(null);
  const [destination, setDestination] = useState(null);
  const [routeInfo, setrouteInfo] = useState();
  const [loading, setloading] = useState(false);
  const [originMarker, setoriginMarker] = useState();
  const [destinationMarker, setdestinationMarker] = useState();
  const { BaseLayer } = LayersControl;
  const rMachine = useRef();

  useEffect(() => {
    function createButton(label, container) {
      const btn = L.DomUtil.create('button', '', container);
      btn.setAttribute('type', 'button');
      btn.innerHTML = label;
      btn.classList =
        'font-lexend block px-1 text-primary bg-gray-300 rounded-md py-1 my-1';
      return btn;
    }

    if (map) {
      map.on('click', (e) => {
        const container = L.DomUtil.create('div');
        container.classList = 'w-fit block font-lexend';
        const startBtn = createButton('Start from this location', container);
        const destBtn = createButton('Go to this location', container);
        L.popup().setContent(container).setLatLng(e.latlng).openOn(map);
        L.DomEvent.on(startBtn, 'click', () => {
          setOrigin(e.latlng);
          map.closePopup();
        });
        L.DomEvent.on(destBtn, 'click', () => {
          setDestination(e.latlng);
          map.closePopup();
        });
      });
    }
  }, [map]);

  useEffect(() => {
    if (origin && !originMarker) {
      const mk = L.marker(origin, {
        icon: userLocationIc
      })
        .bindPopup(`<div>Origin</div>`)
        .addTo(map);
      setoriginMarker(mk);
    } else if (originMarker) {
      originMarker.setLatLng(origin);
    }
    if (destination && !destinationMarker) {
      const mk = L.marker(destination, {
        icon: locationIcon
      })
        .bindPopup(`<div>Destination</div>`)
        .addTo(map);
      setdestinationMarker(mk);
    } else if (destinationMarker) {
      destinationMarker.setLatLng(destination);
    }
    if (origin && destination) {
      if (rMachine.current) {
        rMachine.current.setWaypoints([
          L.latLng(origin),
          L.latLng(destination)
        ]);
        rMachine.current.on('routeselected', (e) => {
          const { route } = e;
          setrouteInfo({
            distance: Math.round(route.summary.totalDistance / 1000),
            stop_points: route.coordinates,
            start_coor: `${origin.lat}, ${origin.lng}`,
            end_coor: `${destination.lat}, ${destination.lng}`
          });
        });
      }
    }
  }, [origin, destination]);

  const handleChangeOrigin = async (value) => {
    if (value.length > 3) {
      const results = await provider.search({ query: value });
      if (results.length > 0) {
        setOrigin({ lat: results[0].x, lng: results[0].y });
      }
    }
  };
  const handleChangeDestination = async (value) => {
    if (value.length > 3) {
      const results = await provider.search({ query: value });
      console.log(results);
      if (results.length > 0) {
        setDestination({ lat: results[0].x, lng: results[0].y });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!routeInfo) {
      toast('You need to select the route');
      return;
    }
    try {
      setloading(true);
      const data = getFormData(e.target);
      await formAction({ ...data, ...routeInfo });
      navigate(-1);
    } catch (error) {
      if (error.response.data) {
        const errorData = error.response.data.data;
        Object.keys(errorData).forEach((key) => {
          toast(`${key}: ${errorData[key]}`, { type: 'error' });
        });
        return;
      }
      toast(error.message);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="w-full px-5">
      <form
        onSubmit={handleSubmit}
        className="p-8 shadow-main px-4 flex flex-col w-100 mx-auto"
      >
        <h1 className="font-bold text-xl pb-8 text-center font-raleway">
          {' '}
          {formTitle}{' '}
        </h1>

        <div className="block mb-4 xl:flex xl:justify-center md:grid md:grid-cols-2 md:gap-2">
          <div className="">
            <label
              htmlFor="origin"
              className="block text-grey-darker text-sm font-bold mb-2"
            >
              Origin:
            </label>

            <input
              onChange={(e) => handleChangeOrigin(e.target.value)}
              name="origin"
              required
              className={inpuStyles}
              placeholder="Ex: Nyabugogo"
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
              onChange={(e) => handleChangeDestination(e.target.value)}
              required
              type="text"
              className={inpuStyles}
              name="destination"
              placeholder="Ex: Down-Town"
            />
          </div>
        </div>

        <div className="h-100 w-100 p-2 m-3 ">
          <MapContainer
            center={{ lat: -1.936671, lng: 30.053524 }}
            zoom={10}
            zoomControl={false}
            className="h-screen md:h-[60vh] w-[100%]"
            whenCreated={setMap}
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
            <RouteCoordinates
              origin={origin}
              destination={destination}
              ref={rMachine}
            />

            <ZoomControl position="topright" />
          </MapContainer>
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

/* eslint-disable jsx-a11y/label-has-associated-control */
import L from 'leaflet';
// import
import { gql, useMutation } from '@apollo/client';
import 'leaflet-routing-machine';
import 'leaflet.marker.slideto';
import React, { useEffect, useState } from 'react';
import {
  LayersControl,
  MapContainer,
  TileLayer,
  ZoomControl
} from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import userLocationIcon from '../../assets/userLocationIcon.png';
import Button, { ButtonLoading } from '../../components/Button.js';

const ADD_STOP_MUTATION = gql`
  mutation CreateBusStop($input: BusStopInput) {
    createBusStop(input: $input) {
      name
      id
    }
  }
`;

const userLocationIc = L.icon({
  iconUrl: userLocationIcon,
  iconSize: [20, 40]
});

const inpuStyles =
  'appearance-none border font-raleway rounded w-full py-2 px-3 text-grey-darker bg-gray-200 text-md outline-hidden';

const AddBusStop = ({}) => {
  const navigate = useNavigate();
  const [origin, setOrigin] = useState(null);
  const [map, setMap] = useState(null);
  const [destination, setDestination] = useState(null);
  const [name, setName] = useState();
  const [loading, setloading] = useState(false);
  const [originMarker, setoriginMarker] = useState();
  const [details, setDetails] = useState();
  const { BaseLayer } = LayersControl;
  const [addBusStop, { data, loading: addLoading }] =
    useMutation(ADD_STOP_MUTATION);

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
        const startBtn = createButton('Select This Location', container);
        L.popup().setContent(container).setLatLng(e.latlng).openOn(map);
        L.DomEvent.on(startBtn, 'click', () => {
          setOrigin(e.latlng);
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
        .bindPopup(`<div>Selected Bus Stop</div>`)
        .addTo(map);
      setoriginMarker(mk);
    } else if (originMarker) {
      originMarker.setLatLng(origin);
    }
  }, [origin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!origin || !name || !details) {
      toast('You need to select the location');
      return;
    }
    try {
      setloading(true);
      // handle submit here
      console.log(e.target);
      const input = {
        details: details,
        location: {
          latitude: origin.lat,
          longitude: origin.lng
        },
        name: name
      };
      addBusStop({
        variables: { input },
        onCompleted: (data) => {
          setName(null);
          setOrigin(null);
          setDetails(null);
        }
      });
    } catch (error) {
      console.log(error);
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
          Add Bus Stop
        </h1>

        <div className="block mb-4 xl:flex xl:justify-center md:grid md:grid-cols-2 md:gap-2">
          <div className="">
            <label
              htmlFor="origin"
              className="block text-grey-darker text-sm font-bold mb-2"
            >
              Name:
            </label>

            <input
              name="name"
              required
              onChange={(e) => setName(e.target.value)}
              className={inpuStyles}
              placeholder="Ex: Nyabugogo"
            />
          </div>
          <div>
            <label
              htmlFor="details"
              name="distance"
              className="block text-grey-darker text-sm font-bold mb-2"
            >
              Details
            </label>
            <textarea
              required
              onChange={(e) => setDetails(e.target.value)}
              type="text"
              className={inpuStyles}
              name="details"
              placeholder="The traffic here is usually dense"
            ></textarea>
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

            <ZoomControl position="topright" />
          </MapContainer>
        </div>

        <div className="self-center mt-6">
          {loading ? (
            <ButtonLoading name="Sending" />
          ) : (
            <Button
              name="Add Stop"
              styles="bg-primary text-sm text-white py-2 px-3 hover:bg-hover"
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default AddBusStop;

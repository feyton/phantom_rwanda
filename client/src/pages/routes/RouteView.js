import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useLocation } from 'react-router-dom';

const RouteView = () => {
  const location = useLocation();
  const routeInfo = location.state?.route;

  return (
    <>
      {routeInfo ? (
        <div className="p-4 bg-white w-[90vh] font-raleway">
          <h2 className="text-2xl text-center font-bold">Route informations</h2>
          <div className="mt-5">
            <ul>
              <li>
                <b> Origin: </b> {routeInfo.origin}
              </li>
              <li>
                <b> Destination: </b> {routeInfo.destination}
              </li>
            </ul>
          </div>
          <div className=" h-[300px] overflow-hidden py-2">
            <h1 className="font-raleway font-bold"> Map </h1> <hr />
            <MapContainer
              center={{ lat: -1.936671, lng: 30.053524 }}
              zoom={13}
              zoomControl={false}
              className="h-full w-full mb-2"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[-1.936671, 30.053524]}>
                <Popup>
                  Route from <b>{routeInfo.origin}</b> to
                  <b>{routeInfo.destination}</b>.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      ) : (
        <div className=" p-12">
          <h1>Route not found</h1>
        </div>
      )}
    </>
  );
};

export default RouteView;

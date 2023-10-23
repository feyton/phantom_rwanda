import '@skyraptor/leaflet.bouncemarker';
import socket from '@utils/socket.js';
import 'leaflet.marker.slideto';
import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import activeBusIcon from '../assets/activeBus.jpg';
import icon from '../assets/busicon.png';
import userLocationIcon from '../assets/userLocationIcon.png';
import {
  setActiveBuses,
  setUserLocation
} from '../redux/reducers/simulateReducer.js';
import { axiosBase } from '../utils/Api.js';
import renderToString from '../utils/renderToString.js';

const busIcon = L.icon({
  iconUrl: icon,
  iconSize: [30, 30],
  popupAnchor: [2, -20]
});

const locationIcon = L.icon({
  iconUrl: activeBusIcon,
  iconSize: [30, 40]
});

const userLocationIc = L.icon({
  iconUrl: userLocationIcon,
  iconSize: [20, 40]
});
const link = `${location.protocol}//${location.host}`;

function ActiveBuses() {
  const map = useMap();
  const [markers, setMarkers] = useState([]);
  const dispatch = useDispatch();

  const handleLocationFound = (event) => {
    const latlng = event.latlng;
    const radius = event.accuracy;
    if (radius < 1000) {
      const circle = L.circle(latlng, radius);
      circle.addTo(map);
    }

    L.marker(latlng, {
      icon: userLocationIc,
      bounceOnAdd: true,
      bouncemarker: true,
      bounceOnAddOptions: { duration: 2000, height: 20, loop: 1 }
    })
      .bindPopup('<div>Your Location</div>')
      .addTo(map);
    dispatch(setUserLocation(JSON.stringify(latlng)));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosBase.get('/simulate');
        const bs = res.data.data;
        dispatch(setActiveBuses(res.data.data));
        let markers = [];
        bs.forEach((b) => {
          const newMarker = L.marker(
            [b.location.latitude, b.location.longitude],
            {
              icon: locationIcon,
              bounceOnAdd: true,
              bouncemarker: true,
              duration: 2000,
              height: 20
            }
          )
            .addTo(map)
            .bindPopup(renderToString(b), {
              className: 'popupCustom'
            });
          markers.push({ marker: newMarker, id: b.entityId });
        });
        setMarkers(markers);
      } catch (error) {
        console.log(error);
        setMarkers([]);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    socket.on('location_update', (data) => {
      const id = data.id;
      markers.filter((entry, index, array) => {
        const marker = entry.id === id;
        if (marker) {
          const mk = entry.marker;
          mk.slideTo(
            [data.bus.location.latitude, data.bus.location.longitude],
            {
              duration: 1500,
              keepAtCenter: false
            }
          ).setIcon(busIcon);
          return;
        } else if (!marker && index === array.length - 1) {
          const newMarker = L.marker(
            [data.bus.location.latitude, data.bus.location.longitude],
            {
              opacity: 0
            }
          )
            .addTo(map)
            .bindPopup(renderToString(data.bus));
          markers.push({ marker: newMarker, id: data.bus.entityId });
          return;
        }
      });
    });
    socket.on('bus_finished', (data) => {
      const id = data.id;
      markers.filter((entry) => {
        const marker = entry.id === id;
        if (marker) {
          const mk = entry.marker;
          mk.setPopupContent(renderToString(data, 'finished'), {
            className: 'popupCustom'
          });
          mk.openPopup();
          setTimeout(() => {
            mk.remove();
          }, 3000);

          return;
        }
      });
    });
    socket.on('bus_alert', (data) => {
      const id = data.id;
      markers.filter((entry) => {
        const marker = entry.id === id;
        if (marker) {
          const mk = entry.marker;
          mk.setPopupContent(renderToString(data.bus), {
            className: 'popupCustom'
          }).openPopup();
          return;
        }
      });
    });
  }, [markers]);
  useEffect(() => {
    map.locate({
      setView: false,
      watch: false,
      enableHighAccuracy: true
    });
    map.on('locationfound', handleLocationFound);
    map.on('locationerror', (e) => {
      toast('Unable to retrive your location');
    });
  }, []);

  return (
    <>
      <span></span>
    </>
  );
}

export default ActiveBuses;

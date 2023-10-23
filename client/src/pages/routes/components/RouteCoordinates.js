import { createControlComponent } from '@react-leaflet/core';
import L from 'leaflet';
import 'leaflet-routing-machine';

const createRoutingMachineLayer = ({ origin, destination }) => {
  const instance = L.Routing.control({
    waypoints: [L.latLng(origin), L.latLng(destination)],
    lineOptions: {
      styles: [{ color: '#6FA1EC', weight: 4 }]
    },
    show: true,
    addWaypoints: true,
    routeWhileDragging: false,
    draggableWaypoints: false,
    fitSelectedRoutes: false,
    showAlternatives: false,
    createMarker: function () {
      return null;
    }
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutingMachineLayer);

export default RoutingMachine;

import { MapContainerProps } from 'react-leaflet';
export const MAP_CONFIG: MapContainerProps = {
  zoom: 3,
  style: {
    height: '60vh',
    width: '100wh',
  },
  center: [51.505, -0.09],
  scrollWheelZoom: false,
};

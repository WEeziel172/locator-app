import { useMapStore } from '@stores/mapStore.ts';
import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

// Leaflet Map instance is not avaiable outside MapContainer component.
// To overcome this issue, we save the map instance to our store for it to be used outside the context of MapContainer
export function MapInstanceController() {
  const { setMap } = useMapStore((state) => ({
    setMap: state.setMap,
  }));
  const map = useMap();

  useEffect(() => {
    setMap(map);
  }, [map]);

  return null;
}

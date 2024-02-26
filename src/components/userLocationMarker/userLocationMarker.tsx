import { useMapStore } from '@stores/mapStore.ts';
import { useCallback, useState } from 'react';
import { LatLng, LeafletMouseEvent } from 'leaflet';
import { Marker, useMapEvents } from 'react-leaflet';

export function UserLocationMarker() {
  const { setUserLocation } = useMapStore((state) => ({
    setUserLocation: state.setUserLocation,
  }));
  const [position, setPosition] = useState<LatLng | null>(null);

  const handleSetPosition = useCallback((e: LeafletMouseEvent) => {
    const { lat, lng } = e.latlng;
    setPosition(e.latlng);
    setUserLocation({ lat, lng });
  }, []);

  useMapEvents({
    click(e) {
      handleSetPosition(e);
    },
  });

  return position === null ? null : <Marker position={position}></Marker>;
}

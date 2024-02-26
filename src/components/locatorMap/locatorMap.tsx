import { MapContainer, TileLayer } from 'react-leaflet';
import { MAP_CONFIG } from '@config';
import { UserLocationMarker } from '@components/userLocationMarker/userLocationMarker.tsx';
import { EntityMarkers } from '@components/entityMarkers/entityMarkers.tsx';
import { MapInstanceController } from '@components/mapInstanceController/mapInstanceController.tsx';
import { useEntityStore } from '@stores/entityStore.ts';
import { useEffect, useState } from 'react';

export function LocatorMap() {
  const { entities, setEntity } = useEntityStore((state) => ({
    entities: state.entities,
    setEntity: state.setEntity,
  }));

  const [currentSelectedMarker, setCurrentSelectedMarker] = useState<number | null>(null);

  function handleOnClickMarker(id: number) {
    setCurrentSelectedMarker(id);
  }

  useEffect(() => {
    if (currentSelectedMarker && entities) {
      const entity = entities?.find((x) => x.id === currentSelectedMarker);
      if (!entity) return;

      setEntity(entity);
    }
  }, [currentSelectedMarker, entities]);

  return (
    <MapContainer
      className={'h-80 sm:h-[40vh] md:h-[40vh] lg:h-[60vh] w-full'}
      center={MAP_CONFIG.center}
      scrollWheelZoom={MAP_CONFIG.scrollWheelZoom}
      zoom={MAP_CONFIG.zoom}
    >
      <MapInstanceController />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <EntityMarkers onClick={handleOnClickMarker} />
      <UserLocationMarker />
    </MapContainer>
  );
}

import { MapContainer, TileLayer } from 'react-leaflet';
import { MAP_CONFIG } from '@config';
import { UserLocationMarker } from '@components/userLocationMarker/userLocationMarker.tsx';
import { EntityMarkers } from '@components/entityMarkers/entityMarkers.tsx';
import { MapInstanceController } from '@components/mapInstanceController/mapInstanceController.tsx';
import { useEntityStore } from '@stores/entityStore.ts';
import { useMemo, useState } from 'react';

export function LocatorMap() {
  const { entities, setEntity, currentEntity } = useEntityStore((state) => ({
    entities: state.entities,
    setEntity: state.setEntity,
    currentEntity: state.currentEntity,
  }));

  const [currentSelectedMarker, setCurrentSelectedMarker] = useState<number | null>(null);

  function handleOnClickMarker(id: number) {
    setCurrentSelectedMarker(id);
  }

  useMemo(() => {
    if (currentSelectedMarker && entities) {
      const entity = entities?.find((x) => x.id === currentSelectedMarker);
      if (!entity) return;

      setEntity(entity);
    }
  }, [currentSelectedMarker, entities]);

  return (
    <MapContainer
      id={'map'}
      className={'h-[50%] sm:h-[50%] md:h-[50%] lg:h-[50%] w-full'}
      center={MAP_CONFIG.center}
      scrollWheelZoom={MAP_CONFIG.scrollWheelZoom}
      zoom={MAP_CONFIG.zoom}
    >
      <MapInstanceController />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <EntityMarkers currentSelected={currentEntity?.id ?? null} onClick={handleOnClickMarker} />
      <UserLocationMarker />
    </MapContainer>
  );
}

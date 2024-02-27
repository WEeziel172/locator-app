import { MapContainer, TileLayer } from 'react-leaflet';
import { MAP_CONFIG } from '@config';
import { UserLocationMarker } from '@components/userLocationMarker/userLocationMarker.tsx';
import { EntityMarkers } from '@components/entityMarkers/entityMarkers.tsx';
import { MapInstanceController } from '@components/mapInstanceController/mapInstanceController.tsx';
import { useEntityStore } from '@stores/entityStore.ts';
import { useCallback } from 'react';

export function LocatorMap() {
  const { entities, setEntity } = useEntityStore((state) => ({
    entities: state.entities,
    setEntity: state.setEntity,
  }));

  const handleOnClickMarker = useCallback(
    (id: number) => {
      const entity = entities?.find((x) => x.id === id);
      if (!entity) return;

      setEntity(entity);
    },
    [entities],
  );

  return (
    <MapContainer
      id={'map'}
      className={'h-[50%] sm:h-[50%] md:h-[50%] lg:h-[50%] w-full'}
      center={MAP_CONFIG.center}
      scrollWheelZoom={MAP_CONFIG.scrollWheelZoom}
      zoom={MAP_CONFIG.zoom}
      preferCanvas={true}
    >
      <MapInstanceController />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <EntityMarkers onClick={handleOnClickMarker} />
      <UserLocationMarker />
    </MapContainer>
  );
}

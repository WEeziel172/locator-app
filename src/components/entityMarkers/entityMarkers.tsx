import { Marker } from 'react-leaflet';
import { useLocations } from '@hooks/useLocations/useLocations.ts';
import { EntityLocation } from '@customTypes/location.ts';
import { useCallback, useMemo } from 'react';
import L from 'leaflet';
import Droid from '@assets/icons/Star_Wars_BB8.svg';
import DroidRed from '@assets/icons/Star_Wars_BB8_red.svg';
import { useEntityStore } from '@stores/entityStore.ts';

const icon = L.icon({
  iconUrl: Droid,
  iconSize: [35, 35], // size of the icon
  iconAnchor: [22, 23], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

const iconRed = L.icon({
  iconUrl: DroidRed,
  iconSize: [40, 40], // size of the icon
  iconAnchor: [22, 22], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

export function EntityMarkers({ onClick }: { onClick: (id: number) => void }) {
  const { locations } = useLocations();
  const { currentEntity } = useEntityStore((state) => ({
    currentEntity: state.currentEntity,
  }));

  const handleOnClick = useCallback(
    (loc: EntityLocation) => {
      onClick(loc.id);
    },
    [onClick],
  );

  const markers = useMemo(() => {
    if (!locations) return [];
    return locations.map((loc) => {
      return (
        <Marker
          icon={currentEntity?.id === loc.id ? iconRed : icon}
          eventHandlers={{
            click: () => handleOnClick(loc),
          }}
          key={loc.id}
          position={[loc.lat, loc.long]}
        ></Marker>
      );
    });
  }, [locations, currentEntity, handleOnClick]);

  if (!locations) return <></>;

  return <>{markers}</>;
}

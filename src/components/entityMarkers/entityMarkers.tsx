import { Marker } from 'react-leaflet';
import { useLocations } from '@hooks/useLocations/useLocations.ts';
import { EntityLocation } from '@customTypes/location.ts';
import { useCallback, useMemo } from 'react';

export function EntityMarkers({ onClick }: { onClick: (id: number) => void }) {
  const { locations } = useLocations();

  const handleOnClick = useCallback((loc: EntityLocation) => {
    onClick(loc.id);
  }, []);

  const markers = useMemo(() => {
    if (!locations) return [];
    return locations.map((loc) => {
      return (
        <Marker
          eventHandlers={{
            click: () => handleOnClick(loc),
          }}
          key={loc.id}
          position={[loc.lat, loc.long]}
        ></Marker>
      );
    });
  }, [locations]);

  if (!locations) return <></>;

  return <>{markers}</>;
}

import { useMapStore } from '@stores/mapStore.ts';
import { useEntityStore } from '@stores/entityStore.ts';
import { useEntities } from '@hooks/useEntities/useEntities.ts';
import { EntityWithLocation } from '@customTypes/entityWithLocation.ts';
import { useCallback, useMemo, useRef } from 'react';
import { EntityCard } from '@components/entityCard/entityCard.tsx';
import TargetingScope from '@assets/icons/noun-targeting-scope-691189.svg';

export function EntityList() {
  const { userLocation, map } = useMapStore((state) => ({
    userLocation: state.userLocation,
    map: state.map,
  }));
  const { setEntity, currentEntity, setEntities } = useEntityStore((state) => ({
    setEntity: state.setEntity,
    currentEntity: state.currentEntity,
    setEntities: state.setEntities,
  }));
  const { entities, loading, error } = useEntities({
    onSuccess: (d) => setEntities(d),
  });
  const listRef = useRef(null);

  useMemo(() => {
    if (listRef.current && currentEntity) {
      const itemIndex = entities?.findIndex((x) => x.id === currentEntity.id);
      if (!itemIndex) return;

      // @ts-expect-error
      // Cant access all properties
      listRef.current?.children?.item(itemIndex).scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center',
      });
    }
  }, [currentEntity, listRef, entities]);

  function calculateDistance({
    fromLocation,
    toLocation,
  }: {
    fromLocation: [number, number];
    toLocation: [number, number];
  }) {
    if (!fromLocation || !toLocation) return 0;
    let distance = map!.distance(fromLocation, toLocation);
    distance = Number((distance / 1000).toFixed(1));
    return distance;
  }

  function sortByNearest(a: EntityWithLocation, b: EntityWithLocation) {
    const aDistance = calculateDistance({ fromLocation: userLocation!, toLocation: [a.lat, a.lng] });
    const bDistance = calculateDistance({ fromLocation: userLocation!, toLocation: [b.lat, b.lng] });
    return aDistance - bDistance;
  }

  const handleOnClick = useCallback(
    (e: EntityWithLocation) => {
      if (!map) return;
      map.flyTo([e.lat, e.lng], 12);
      setEntity(e);
    },
    [map],
  );

  const entitiesList = useMemo(() => {
    if (!entities) return [];
    return entities
      .sort((a, b) => sortByNearest(a, b))
      .map((e) => {
        return (
          <EntityCard
            selected={e.id === currentEntity?.id}
            onClick={() => handleOnClick(e)}
            key={e.id}
            entity={e}
            distance={calculateDistance({ fromLocation: userLocation!, toLocation: [e.lat, e.lng] })}
          />
        );
      });
  }, [entities, map, userLocation, currentEntity]);

  if (loading) {
    return (
      <div className={'flex justify-center items-center w-full h-full'}>
        <img src={TargetingScope} className={'h-64 w-48 animate-pulse'} />
      </div>
    );
  }

  return (
    <div
      ref={listRef}
      className={
        'grid grid-flow-col grid-rows-1 gap-2 sm:overflow-x-scroll overflow-y-scroll scroll-smooth h-full p-4 w-full scroll-type-x-mandatory'
      }
    >
      {entitiesList}
    </div>
  );
}

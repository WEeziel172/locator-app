import { EntityWithLocation } from '@customTypes/entityWithLocation.ts';

import { Card } from '@components/card/card.tsx';

export function EntityCard({
  entity,
  distance,
  onClick,
  selected,
}: {
  entity: EntityWithLocation;
  distance: number;
  onClick: (e: MouseEvent) => void;
  selected: boolean;
}) {
  const selectedStyles = selected ? 'shadow-[0px_0px_25px_rgb(34,178,79,0.5)] scale-105 ' : '';

  return (
    <Card
      selected={selected}
      onClick={onClick}
      image={entity.image}
      imageClassName={'object-contain h-full w-full'}
      className={`bg-[#1f74c12b] border-[1px] border-opacity-10 rounded-l w-72 sm:w-64 md:w-80 lg:w-64 border-2 border-blue-100 cursor-pointer hover:scale-105 transition-all scroll-snap-align-center ${selectedStyles}`}
      details={[
        <dl data-testid={'description-list'} key={entity.id} className={'p-4'}>
          <dd data-testid={'description-item'} className={'text-xl text-amber-100'}>
            {entity.name}
          </dd>
          <dd className={'text-amber-50'}>{entity.species}</dd>
          <dd className={'text-amber-50'}>{distance} km</dd>
        </dl>,
      ]}
    />
  );
}

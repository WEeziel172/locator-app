import { EntityWithLocation } from '@customTypes/entityWithLocation.ts';

import { Card } from '@components/card/card.tsx';
import { DescriptionItem } from '@components/descriptionItem/descriptionItem.tsx';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const selectedStyles = selected ? 'shadow-[0px_0px_25px_rgb(34,178,79,0.5)] scale-105 ' : '';

  return (
    <Card
      selected={selected}
      onClick={onClick}
      image={entity.image}
      imageClassName={'object-cover h-full w-full'}
      className={`bg-[#1f74c12b] border-[1px] border-opacity-10 rounded-l w-72 sm:w-64 md:w-80 lg:w-64 border-blue-100 cursor-pointer hover:scale-105 transition-all scroll-snap-align-center ${selectedStyles} relative`}
      details={[
        <dl
          data-testid={'description-list'}
          key={entity.id}
          className={`p-4 absolute glass w-full bottom-0 sm:bottom-auto sm:top-0 ${selected ? 'h-full' : ''} transition-all`}
        >
          <dd data-testid={'description-item'} className={'text-xl text-amber-100'}>
            {entity.name}
          </dd>
          <dd className={'text-amber-50'}>{distance} km</dd>
          {selected && (
            <div className={'text-amber-50 mt-2'}>
              <DescriptionItem title={t('entity.born')} description={entity.born} />
              <DescriptionItem title={t('entity.homeworld')} description={entity.homeworld || 'unknown'} />
              <DescriptionItem title={t('entity.cybergenetics')} description={entity.cybernetics || 'unknown'} />
              <DescriptionItem title={t('entity.height')} description={entity.height || 'unknown'} />
            </div>
          )}
        </dl>,
      ]}
    />
  );
}

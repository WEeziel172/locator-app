import { useEntityStore } from '@stores/entityStore.ts';
import { useEffect, useState } from 'react';
import { DescriptionList } from '@components/descriptionList/descriptionList.tsx';
import { DescriptionItem } from '@components/descriptionItem/descriptionItem.tsx';

export function EntityModal() {
  const [show, setShow] = useState<boolean>(false);
  const { currentEntity } = useEntityStore((state) => ({
    currentEntity: state.currentEntity,
  }));

  useEffect(() => {
    if (currentEntity) {
      setShow(true);
    }
    return () => setShow(false);
  }, [currentEntity]);

  if (!show || !currentEntity) return <></>;

  return (
    <div className={'flex fixed justify-center sm:justify-normal top-[7rem] w-full h-40 z-[999]'}>
      <div className={' sm:ml-14 glass w-[20rem] h-[50vh]  rounded-2xl text-amber-50 text-sm p-4 text-center'}>
        <h2 className={'text-xl '}>{currentEntity.name}</h2>
        <DescriptionList>
          <DescriptionItem title={'Species'} description={currentEntity.species} />
          <DescriptionItem title={'Gender'} description={currentEntity.gender} />
          <DescriptionItem title={'Born'} description={currentEntity.born} />
          <DescriptionItem title={'Homeworld'} description={currentEntity.homeworld || 'unknown'} />
          <DescriptionItem title={'Cybernetics'} description={currentEntity.cybernetics || 'unknown'} />
        </DescriptionList>
        <button
          onClick={() => setShow(false)}
          className={'sm:hidden h-8 w-24 bg-blue-300 rounded-md text-amber-50 text-sm mt-4'}
        >
          Close
        </button>
      </div>
    </div>
  );
}

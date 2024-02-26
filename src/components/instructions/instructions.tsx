import { useMapStore } from '@stores/mapStore.ts';
import Typewriter from 'typewriter-effect';
import { useEntityStore } from '@stores/entityStore.ts';

export function Instructions() {
  const { userLocation } = useMapStore((state) => ({
    userLocation: state.userLocation,
  }));
  const { currentEntity } = useEntityStore((state) => ({
    currentEntity: state.currentEntity,
  }));

  if (userLocation && currentEntity) return null;
  if (userLocation && !currentEntity) {
    return (
      <div className={'flex justify-center items-center absolute top-[7rem] w-full h-40'}>
        <div className={'glass w-96 h-auto z-[999] rounded-2xl text-amber-50 text-sm p-4 text-center'}>
          <Typewriter
            options={{
              delay: 35,
              strings: [
                'You can click on a marker on the map to reveal the entity.',
                'You can also click the entity cards to reveal details and fly to destination',
              ],
              autoStart: true,
              loop: false,
              deleteSpeed: 9999999999999,
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={'flex justify-center items-center absolute top-[7rem] w-full h-40'}>
      <div className={'glass w-96 h-auto z-[999] rounded-2xl text-amber-50 text-sm p-4 text-center'}>
        <Typewriter
          options={{
            delay: 35,
            strings: ['Click on a position on the map to reveal detailed information'],
            autoStart: true,
            loop: false,
            deleteSpeed: 9999999999999,
          }}
        />
      </div>
    </div>
  );
}

export default Instructions;

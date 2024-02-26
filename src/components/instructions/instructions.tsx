import { useMapStore } from '@stores/mapStore.ts';
import Typewriter from 'typewriter-effect';

export function Instructions() {
  const { userLocation } = useMapStore();

  if (userLocation) return <></>;

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

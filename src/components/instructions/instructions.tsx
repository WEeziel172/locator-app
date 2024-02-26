import { useMapStore } from '@stores/mapStore.ts';
import Typewriter from 'typewriter-effect';
import { useEntityStore } from '@stores/entityStore.ts';
import { useTranslation } from 'react-i18next';

export function Instructions() {
  const { t } = useTranslation();
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
              strings: [t('instructions.additional')],
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
            strings: [t('instructions.how_to_start')],
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

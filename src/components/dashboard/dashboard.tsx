import { useMapStore } from '@stores/mapStore.ts';
import { EntityList } from '@components/entityList/entityList.tsx';
import { useTranslation } from 'react-i18next';

export function Dashboard() {
  const { userLocation } = useMapStore((state) => ({
    userLocation: state.userLocation,
  }));
  const { t } = useTranslation();

  return (
    <div className={'h-[50%] sm:h-[50%] border-t-[1px] border-[#ffffff2e]'}>
      <>
        {!userLocation && (
          <div className={'flex justify-center items-center w-full h-full'}>
            <div className={'glass mt-4 h-auto rounded-2xl text-amber-50 text-base p-4 text-center'}>
              {t('instructions.start_by_clicking')}
            </div>
          </div>
        )}
        {userLocation && <EntityList />}
      </>
    </div>
  );
}

export default Dashboard;

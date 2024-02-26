import { useMapStore } from '@stores/mapStore.ts';
import { EntityList } from '@components/entityList/entityList.tsx';

export function Dashboard() {
  const { userLocation } = useMapStore((state) => ({
    userLocation: state.userLocation,
  }));

  return <div className={'h-[50%] sm:h-[50%] border-t-[1px] border-[#ffffff2e]'}>{userLocation && <EntityList />}</div>;
}

export default Dashboard;

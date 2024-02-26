import { useMapStore } from '@stores/mapStore.ts';
import { EntityList } from '@components/entityList/entityList.tsx';

export function Dashboard() {
  const { userLocation } = useMapStore();

  return <div className={'glass h-96 sm:h-[100%]'}>{userLocation && <EntityList />}</div>;
}

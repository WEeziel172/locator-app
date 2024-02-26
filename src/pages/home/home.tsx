import 'leaflet/dist/leaflet.css';
import iconMarker from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import { LocatorMap } from '@components/locatorMap/locatorMap.tsx';
import { Header } from '@components/header/header.tsx';
import { Dashboard } from '@components/dashboard/dashboard.tsx';
import { Instructions } from '@components/instructions/instructions.tsx';
import { EntityModal } from '@components/entityModal/entityModal.tsx';

// In production build, leaflet assets are not reference correctly by react leaflet
// By setting them explicitly, they will always be reference correctly when building for production

if (import.meta.env.PROD) {
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: iconRetina,
    iconUrl: iconMarker,
    shadowUrl: iconShadow,
  });
}

export function Home() {
  return (
    <>
      <Header />
      <main>
        <Instructions />
        <LocatorMap />
        <Dashboard />
        <EntityModal />
      </main>
    </>
  );
}

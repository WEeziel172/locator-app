import 'leaflet/dist/leaflet.css';
import iconMarker from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import { LocatorMap } from '@components/locatorMap/locatorMap.tsx';
import { Header } from '@components/header/header.tsx';
import React, { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('@components/dashboard/dashboard.tsx'));
const EntityModal = lazy(() => import('@components/entityModal/entityModal.tsx'));
const Instructions = lazy(() => import('@components/instructions/instructions.tsx'));

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
        <Suspense fallback={<></>}>
          <Instructions />
        </Suspense>
        <LocatorMap />
        <Suspense fallback={<>Loading...</>}>
          <Dashboard />
        </Suspense>
        <Suspense fallback={<>Loading...</>}>
          <EntityModal />
        </Suspense>
      </main>
    </>
  );
}

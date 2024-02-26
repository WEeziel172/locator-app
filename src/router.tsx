import { createBrowserRouter } from 'react-router-dom';
import { Home } from '@pages/home/home.tsx';
import { INTERNAL_ROUTES, PROD_BASE_URL } from '@constants';

export const router = createBrowserRouter(
  [
    {
      path: INTERNAL_ROUTES.HOME,
      element: <Home />,
    },
  ],
  {
    basename: import.meta.env.PROD ? PROD_BASE_URL : '',
  },
);

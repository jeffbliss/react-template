import { createBrowserRouter, RouterProvider } from 'react-router';
import { paths } from '@/config/paths';
import { HomeRoute } from './routes/home';
import { NotFoundRoute } from './routes/not-found';

const createAppRouter = () =>
  createBrowserRouter([
    {
      path: paths.home.path,
      element: <HomeRoute />,
    },
    {
      path: '*',
      element: <NotFoundRoute />,
    },
  ]);

export const AppRouter = () => {
  const router = createAppRouter();
  return <RouterProvider router={router} />;
};

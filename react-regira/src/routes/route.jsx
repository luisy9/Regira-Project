import { createBrowserRouter } from 'react-router-dom';
import { Login, Register } from '../components';
import { LayoutPage } from '../layout';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
  },

  {
    path: '/login',
    element: <Login />,
  },

  {
    path: '/register',
    element: <Register />,
  },
]);

export default router;

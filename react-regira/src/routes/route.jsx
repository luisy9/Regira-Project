import { createBrowserRouter } from 'react-router-dom';
import { Login, Register } from '../components';
import { HomePage } from '../pages'
import { LayoutPage } from '../layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      }
    ]
  },
  
  {
    path: '/login',
    element: <Login />
  },

  {
    path: '/register',
    element: <Register />
  }
]);

export default router;

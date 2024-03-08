import { createBrowserRouter } from 'react-router-dom';
import { Login, Register } from '../components';
import { HomePage } from '../pages'
import { AppRegira } from '../AppRegira';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppRegira />,
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

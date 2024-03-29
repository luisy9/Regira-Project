import { createBrowserRouter } from 'react-router-dom';
import { Login, Register } from '../components';
import { HomePage, NewProject, NewTarea, Project } from '../pages'
import { LayoutPage } from '../layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/newTarea',
        element: <NewTarea />
      },
      {
        path: '/newProject',
        element: <NewProject />
      },
      {
        path: '/proyecto/:id',
        element: <Project />
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

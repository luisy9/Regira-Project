import { useState } from 'react'
import { RouterProvider } from 'react-router-dom';
import { contextRegira } from './context'
import { router } from './routes';

export const AppRegira = () => {

  const [logued, setLogued] = useState(localStorage.getItem('isLogued') || null);

  return (
    <contextRegira.Provider value={{ logued, setLogued }}>
      <RouterProvider router={router} />
    </contextRegira.Provider>
  )
}
export default AppRegira;

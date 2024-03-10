import { useState } from 'react'
import { RouterProvider } from 'react-router-dom';
import { contextRegira } from './context'
import { router } from './routes';

export const AppRegira = () => {

  const loadStorage = document.cookie ? localStorage.getItem('isLogued') : null
  const [logued, setLogued] = useState(loadStorage);

  return (
    <contextRegira.Provider value={{ logued, setLogued }}>
      <RouterProvider router={router} />
    </contextRegira.Provider>
  )
}
export default AppRegira;

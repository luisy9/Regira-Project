import { useEffect, useContext, useState } from "react"
import { contextRegira } from '../context'
import { NavLink } from 'react-router-dom';

export const HomePage = () => {

  const url = 'http://localhost:3000/api';
  const { logued, setLogued } = useContext(contextRegira);
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    const opcions = {
      credentials: 'include',
    };

    if (logued) {
      fetch(url + '/proyecto/' + logued, opcions).then(res => res.json()).then(data => {
        if (data) {
          setProyectos([data]);
        }
      }).catch(error => console.log(error))
    }
  }, [logued]);

  if (!proyectos) {
    return (
      <h1>No hay proyectos!</h1>
    )
  }

  return (
    <div className="">
      <h1 className="text-3xl text-center">Pagina Home</h1>
      <div className="flex gap-5">
        {
          proyectos.length > 0 ? proyectos.map(proyecto => {
            return (
              <>
                <NavLink to={'/proyecto/' + proyecto.id}>
                  <div className="py-2 px-4 border rounded-md w-62 h-40 cursor-pointer" key={proyecto.id}>
                    <h1 className="text-bold">{proyecto.nombre}</h1>
                    <p>{proyecto.descripcion}</p>
                    <p>Todos los tiquets abiertos 0</p>
                  </div>
                </NavLink>
              </>
            )
          }) : <></>
        }
      </div>
    </div>
  )
}

export default HomePage
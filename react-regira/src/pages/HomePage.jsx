import { useEffect, useContext, useState } from "react"
import { contextRegira } from '../context'
import { NavLink } from 'react-router-dom';
import TargetProject from "../components/TargetProject/TargetProject";
import AddItemBox from "../components/AddItemsBox/AddItemBox";

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
    <div className="w-full pt-10">
      <AddItemBox />
      <h1 className="text-3xl pb-3 font-semibold">Tu Trabajo</h1>
      <hr className="max-w-full max-auto" />
      <h1 className="pt-4 font-medium">Proyectos recientes</h1>
      <div className="flex gap-5 py-3">
        {
          proyectos.length > 0 ? proyectos.map(proyecto => <TargetProject proyectoId={proyecto.id} proyecto={proyecto} key={proyecto.id} />) : <></>
        }
      </div>
    </div>
  )
}

export default HomePage
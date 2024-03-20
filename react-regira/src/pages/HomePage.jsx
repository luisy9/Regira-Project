import { useEffect, useContext, useState } from "react";
import { contextRegira } from "../context";
import TargetProject from "../components/TargetProject/TargetProject";
import AddItemBox from "../components/AddItemsBox/AddItemBox";
import HandlersRegira from "../components/handlersRegira/HandlersRegira";

export const HomePage = () => {
  const url = "http://localhost:3000/api";
  const { logued, setLogued } = useContext(contextRegira);
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    const opcions = {
      method: "GET",
      credentials: "include",
    };

    if (logued) {
      fetch(url + "/proyecto/user/" + logued, opcions)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setProyectos(data);
          }
        }).catch((error) => console.log(error));
    }
  }, [logued]);

  if (!proyectos) {
    return <h1>No hay proyectos!</h1>;
  }

  if (!logued) {
    return (window.location.href = "/Login");
  }

  return (
    <div className="w-full pt-5">
      <div className="mb-10">
        <AddItemBox />
      </div>
      <div className="mb-10">
        <HandlersRegira />
      </div>
      <h1 className="text-3xl pb-3 font-semibold">Tu Trabajo</h1>
      <hr className="max-w-full max-auto" />
      <h1 className="pt-4 font-medium">Proyectos recientes</h1>
      <div className="flex gap-5 py-3">
        {proyectos.error ? (
          <></>
        ) : (
          proyectos.map((proyecto) => (
            <TargetProject
              proyectoId={proyecto.id}
              proyecto={proyecto}
              key={proyecto.id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;

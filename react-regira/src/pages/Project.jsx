import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { contextRegira } from '../context';
import { DragDrop } from '../components';
import PopUpNewTask from "../components/PopUp/PopUpNewTask";

export const Project = () => {

  const url = 'http://localhost:3000/api';
  const { id } = useParams();
  const { logued, setLogued } = useContext(contextRegira);
  const [allUsers, setAllUsers] = useState([]);
  const [allProjectTasks, setAllProjectTasks] = useState([]);
  const [usuarioAsignado, setUsuarioAsignado] = useState([]);
  const [tag, setTag] = useState([]);
  const [addTag, setAddTag] = useState([]);

  const [popUp, setPopUp] = useState(false);

  useEffect(() => {
    if (!logued) {
      return (
        <h1 className="text-red-500">No estas autorizado!</h1>
      )
    } else {
      const opcions = {
        method: 'GET',
        credentials: 'include'
      }

      //Quiero saber si ese usuario esta dentro de ese proyecto esto hay que cambiarlo!
      fetch(url + '/users', opcions).then(res => res.json()).then(data => {
        if (data.length > 0) {
          setAllUsers(data)
          setUsuarioAsignado([data[0].id])
        }
      }).then(fetch(url + '/tarea/proyecto/' + id, opcions)
        .then(res => res.json())
        .then(tasks => setAllProjectTasks(tasks)))
        .catch(error => console.log(error));
    }
  }, []);

  const [formState, setFormState] = useState({
    tipo: 'feature',
    titulo: '',
    descripcion: '',
    prioridad: 'High',
    estado: 'doing',
  });


  const newTareaInProject = () => {
    event.preventDefault();

    const opcions = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body:
        JSON.stringify({
          ...formState,
          usuarios_id: parseInt(usuarioAsignado[0]),
          proyectos_id: parseInt(id), author_id: parseInt(logued)
        })
    }

    const finalTags = addTag.filter(e => Object.values(e)[0] !== false);
    fetch(url + '/tarea/proyecto/' + id, opcions)
      .then(res => res.json())
      .then(data => {
        setAllProjectTasks([...allProjectTasks, data]);
        setPopUp(false);
        fetch(url + '/tag/tarea/' + data.id, { ...opcions, body: JSON.stringify({ finalTags: [...finalTags] }) })
          .then(res => res.json())
          .then(data => console.log(data)).catch(error => console.log(error))
      })
      .catch(error => console.log(error));
  }

  const openModal = () => {

    setPopUp(true);
    setAddTag([]);
    //Consulta para ver todos los tags disponibles
    const opcions = {
      method: 'GET',
      credentials: 'include'
    };

    fetch(url + '/tag', opcions)
      .then(res => res.json())
      .then(data => setTag(data))
      .catch(error => console.log(error));
  }

  const onChangeCheckTag = (tag) => {
    setAddTag(addTag => {
      if (addTag.length === 0) {
        return [tag];
      } else {
        const tagsFiltrados = addTag.filter(tags => Object.keys(tags)[0] != Object.keys(tag)[0]);
        if (Object.keys(tag)[0]) {
          return [...tagsFiltrados, tag]
        }
      }
    })
  }

  const onDeleteTask = () => {
    const opcions = {
      method: 'GET',
      credentials: 'include'
    }

    fetch(url + '/tarea/proyecto/' + id, opcions)
      .then(res => res.json())
      .then(tasks => setAllProjectTasks(tasks))
        .catch (error => console.log(error))
  }

return (
  <>
    <div className="w-full">
      <div className="flex justify-end pb-5">
        <button className="border rounded-md text-lg px-5 py-2 bg-[#0054CD] text-white" onClick={openModal}>Crear tarea</button>
      </div>
      {
        popUp ? (
          <PopUpNewTask newTareaInProject={newTareaInProject}
            setPopUp={setPopUp}
            allUsers={allUsers}
            setFormState={setFormState}
            formState={formState}
            usuarioAsignado={usuarioAsignado}
            setUsuarioAsignado={setUsuarioAsignado}
            tag={tag}
            setTag={setTag}
            addTag={addTag}
            setAddTag={setAddTag}
            onChangeCheckTag={onChangeCheckTag}
          />
        ) : null
      }
      {
        (
          <div className="flex justify-start h-4/5">
            <DragDrop id={id} allProjectTasks={allProjectTasks} onDeleteTask={onDeleteTask} />
          </div>
        )
      }
    </div>
  </>

)
}

export default Project

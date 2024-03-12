import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { contextRegira } from '../context';
// import { ShowTasksProject } from "../components";
import { DragDrop } from '../components';
import PopUpNewTask from "../components/PopUp/PopUpNewTask";

export const Project = () => {

  const url = 'http://localhost:3000/api';
  const { id } = useParams();
  const { logued, setLogued } = useContext(contextRegira);
  const [allUsers, setAllUsers] = useState([]);

  const [allProjectTasks, setAllProjectTasks] = useState([]);
  const [updatedAllProjectTasks, setUpdatedAllProjectTasks] = useState([]);
  const [popUp, setPopUp] = useState(false);
  // const [popUpProjectTask, setPopUpProjectTask] = useState(false);
  const [typeTask, setTypeTask] = useState('feature');
  const [priorityTask, setPriorityTask] = useState('High');
  const [stateTask, setStateTask] = useState('doing');
  const [titulo, setTitulo] = useState('');
  const [usuarioAsignado, setUsuarioAsignado] = useState([]);
  const [descripcion, setDescripcion] = useState('');


  useEffect(() => {
    if (!logued) {
      return (
        <h1 className="text-red-500">No estas autorizado!</h1>
      )
    } else {
      console.log(logued)
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

  const newTareaInProject = () => {
    event.preventDefault();

    const data = {
      tipo: typeTask, 
      titulo: titulo,
      descripcion: descripcion, 
      prioridad: priorityTask,
      estado: stateTask, 
      usuarios_id: usuarioAsignado[0],
      author_id: parseInt(logued),
      proyectos_id: parseInt(id)
    };

    const opcions = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    fetch(url + '/tarea/proyecto/'+id, opcions)
      .then(res => res.json())
      .then(data => {
        setAllProjectTasks([...allProjectTasks, data]);
        setPopUp(false)
      })
      .catch(error => console.log(error));
  }

  const openModal = () => setPopUp(true);

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
              setTypeTask={setTypeTask}
              typeTask={typeTask}
              setPriorityTask={setPriorityTask}
              priorityTask={priorityTask}
              setStateTask={setStateTask}
              stateTask={stateTask}
              setTitulo={setTitulo}
              titulo={titulo}
              setUsuarioAsignado={setUsuarioAsignado}
              usuarioAsignado={usuarioAsignado}
              allUsers={allUsers}
              setDescripcion={setDescripcion}
              descripcion={descripcion}
            />
          ) : null
        }
        {
          allProjectTasks.length > 0 ? (
            <div className="flex justify-start h-4/5">
              <DragDrop id={id} allProjectTasks={allProjectTasks} />
            </div>
          )
            : <div className="flex flex-col">
              <h1>Tus tareas apareceran aqui</h1>
              <div className="flex justify-center py-4">
                <button className="border py-1 rounded-md px-5 text-white bg-[#0054CD] hover:cursor-pointer hover:bg-[#4d97ff]" onClick={() => setPopUp(true)}>Crear tarea</button>
              </div>
            </div>
        }
      </div>
    </>

  )
}

export default Project

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { contextRegira } from '../context';
// import { ShowTasksProject } from "../components";
import { DragDrop } from '../components';

export const Project = () => {

  const { logued, setLogued } = useContext(contextRegira);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    if (!logued) {
      return (
        <h1 className="text-red-500">No estas autorizado!</h1>
      )
    }

  }, []);

  const [popUp, setPopUp] = useState(false);
  const [typeTask, setTypeTask] = useState('feature');
  const [priorityTask, setPriorityTask] = useState('High');
  const [stateTask, setStateTask] = useState('doing');
  const [titulo, setTitulo] = useState('');
  const [usuarioAsignado, setUsuarioAsignado] = useState([]);
  const [allProjectTasks, setAllProjectTasks] = useState([]);

  useEffect(() => {
    const opcions = {
      method: 'GET',
      credentials: 'include'
    }

    fetch(url + '/users', opcions).then(res => res.json()).then(data => {
      if (data.length > 0) {
        setAllUsers(data)
        setUsuarioAsignado(data[0].id)
      }
    }).then(fetch(url + '/tarea/proyecto/'+id, opcions).then(res => res.json()).then(tasks => setAllProjectTasks(tasks))).catch(error => console.log(error));
  }, [logued]);

  const { id } = useParams();
  const url = 'http://localhost:3000/api';

  const newTareaInProject = () => {
    event.preventDefault();

    const data = { tipo: typeTask, titulo: titulo, prioridad: priorityTask, estado: stateTask, usuarios_id: usuarioAsignado, author_id: parseInt(logued), proyectos_id: parseInt(id) };

    const opcions = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    fetch(url + '/tarea', opcions).then(res => res.json()).then(data => setPopUp(false)).catch(error => console.log(error));
  }

  return (
    <>
    <div className="w-full">
      {
        popUp ? (
          <div className="z-40 flex justify-center items-center absolute top-0 left-0 w-full h-full backdrop-blur-sm">
            <div className="flex flex-col justify-end border-2 border-[#0054CD] bg-white w-96 rounded-md px-3 py-2">
              <div className="flex justify-between">
                <h1 className="text-2xl text-bold">Añade una nueva tarea</h1>
                <button className="cursor-pointer" onClick={() => setPopUp(false)}>X</button>
              </div>
              <form className="h-full flex flex-col justify-end" onSubmit={newTareaInProject}>
                <div className="py-3">
                  <label htmlFor="">Tipo tarea: </label>
                  <select onChange={() => setTypeTask(event.target.value)} value={typeTask} className="border-2 rounded-md pr-10">
                    <option value="feature">feature</option>
                    <option value="bug">bug</option>
                    <option value="task">task</option>
                    <option value="history">history</option>
                  </select>
                </div>
                <div className="py-3">
                  <label>Titulo de la tarea: </label>
                  <input required type="text" name="titulo" className="border rounded-md border-[#0054CD] placeholder:px-1" placeholder="Titulo de la tarea" onChange={() => setTitulo(event.target.value)} />
                </div>
                <div className="py-3">
                  <label htmlFor="">Prioridad: </label>
                  <select onChange={() => setPriorityTask(event.target.value)} value={priorityTask} className="border-2 rounded-md pr-10">
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div className="py-3">
                  <label htmlFor="">Estado: </label>
                  <select onChange={() => setStateTask(event.target.value)} value={stateTask} className="border-2 rounded-md pr-10">
                    <option value="doing">Doing</option>
                    <option value="finished">Finish</option>
                    <option value="paused">Paused</option>
                    <option value="not doing">Not doing</option>
                  </select>
                </div>

                <div className="py-3">
                  <label htmlFor="">Asignar a un User: </label>
                  <p>{allUsers[0].id}</p>
                  <select required onChange={() => setUsuarioAsignado([event.target.value])} value={usuarioAsignado} className="border-2 rounded-md pr-10">
                    {
                      allUsers.length > 0 &&
                      allUsers?.map(user => <option value={user.id} key={user.id}>{user.email}</option>)
                    }
                  </select>
                </div>
                <div className="w-full pt-3">
                  <div className="">
                    <button type="submit" className="w-full border px-5 py-1 rounded-md text-white bg-[#0054CD] hover:bg-[#5793e7]">Continuar</button>
                  </div>

                </div>
              </form>
            </div>
          </div>
        ) : null
      }
      {
        allProjectTasks.length > 0 ? (
          <div className="flex justify-start h-full">
            <DragDrop allProjectTasks={allProjectTasks} id={id} />
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

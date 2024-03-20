import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { contextRegira } from "../context";
import { DragDrop } from "../components";
import PopUpNewTask from "../components/PopUpAddTask/PopUpNewTask";
import PopUpUpdateTask from "../components/PopUpUpdateTask/PopUpUpdateTask";
import PopUpComments from "../components/PopUpComments/PopUpComments";

export const Project = () => {
  const url = "http://localhost:3000/api";
  const { id } = useParams();
  const { logued, setLogued } = useContext(contextRegira);
  const [allUsers, setAllUsers] = useState([]);
  const [allProjectTasks, setAllProjectTasks] = useState([]);
  const [usuarioAsignado, setUsuarioAsignado] = useState([]);
  const [tag, setTag] = useState([]);
  const [addTag, setAddTag] = useState([]);
  const [taskUpdate, setTaskUpdate] = useState([]);
  const [enumsTypes, setEnumsTypes] = useState([]);

  const [formState, setFormState] = useState({
    tipo: "",
    titulo: "",
    descripcion: "",
    prioridad: "",
    estado: "",
  });

  //Set modal create tag open || Set modal update open
  const [popUp, setPopUp] = useState([
    { createTask: false },
    {
      updateTask: false,
      idTask: null,
    },
    {
      viewComments: false,
      idTask: null
    }
  ]);

  useEffect(() => {
    if (!logued) {
      return <h1 className="text-red-500">No estas autorizado!</h1>;
    } else {
      const opcions = {
        method: "GET",
        credentials: "include",
      };

      //Quiero saber si ese usuario esta dentro de ese proyecto esto hay que cambiarlo!
      fetch(url + "/users", opcions)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            setAllUsers(data);
            setUsuarioAsignado([data[0].id]);
          }
        })
        .then(
          fetch(url + "/tarea/proyecto/" + id, opcions)
            .then((res) => res.json())
            .then((tasks) => {
              if (tasks) {
                setAllProjectTasks(tasks);
              }
            })
        )
        .catch((error) => console.log(error));

      fetch(url + "/enum", opcions)
        .then((res) => res.json())
        .then((enums) => {
          setEnumsTypes(enums);

          setFormState({
            tipo: enums.enumTipo[0],
            titulo: "",
            descripcion: "",
            prioridad: enums.enumPrioridad[0],
            estado: enums.enumEstado[0],
          });
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const [enums, setEnums] = useState([]);

  const newTareaInProject = () => {
    event.preventDefault();

    const opcions = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        ...formState,
        usuarios_id: parseInt(usuarioAsignado[0]),
        proyectos_id: parseInt(id),
        author_id: parseInt(logued),
      }),
    };

    const finalTags = addTag.filter((e) => Object.values(e)[0] !== false);

    fetch(url + "/tarea/proyecto/" + parseInt(id), {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((updatedItems) => setAllProjectTasks(updatedItems))
      .then(
        fetch(url + "/tarea/proyecto/" + parseInt(id), opcions)
          .then((res) => res.json())
          .then((data) => {
            setAllProjectTasks((updatedItems) => [...updatedItems, data]);
            setPopUp({ ...popUp, createTask: false });

            fetch(url + "/tag/tarea/" + data.id, {
              ...opcions,
              body: JSON.stringify({ finalTags: [...finalTags] }),
            })
              .then((res) => res.json())
              .then((data) => console.log(data))
              .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error))
      )
      .catch((error) => console.log(error));

    //Reseteamos los valores del form por defecto
    fetch(url + "/enum", opcions)
      .then((res) => res.json())
      .then((enums) => {
        setEnumsTypes(enums);

        setFormState({
          tipo: enums.enumTipo[0],
          titulo: "",
          descripcion: "",
          prioridad: enums.enumPrioridad[0],
          estado: enums.enumEstado[0],
        });
      })
      .catch((error) => console.log(error));
  };

  //OPEN MODAL CREATE TASK
  const openModal = () => {
    setPopUp({ ...popUp, createTask: true });
    setAddTag([]);

    //Consulta para ver todos los tags disponibles
    const opcions = {
      method: "GET",
      credentials: "include",
    };

    fetch(url + "/tag", opcions)
      .then((res) => res.json())
      .then((data) => setTag(data))
      .catch((error) => console.log(error));
  };

  //Change Tag in task
  const onChangeCheckTag = (tag) => {
    setAddTag((addTag) => {
      if (addTag.length === 0) {
        return [tag];
      } else {
        const tagsFiltrados = addTag.filter(
          (tags) => Object.keys(tags)[0] != Object.keys(tag)[0]
        );
        if (Object.keys(tag)[0]) {
          return [...tagsFiltrados, tag];
        }
      }
    });
  };

  //DELETE
  //Delete one Task
  const onDeleteTask = () => {
    const opcions = {
      method: "GET",
      credentials: "include",
    };

    fetch(url + "/tarea/proyecto/" + id, opcions)
      .then((res) => res.json())
      .then((tasks) => setAllProjectTasks(tasks))
      .catch((error) => console.log(error));
  };

  //UPDATE MODAL
  //Open modal update task
  const [actualTagsChecked, setActualTagsChecked] = useState([]);
  const onUpdateTask = (id) => {
    setPopUp({ createTask: false, updateTask: true, idTask: id });

    const opcions = {
      method: "GET",
      credentials: "include",
    };

    fetch(url + "/tag", opcions)
      .then((res) => res.json())
      .then((data) => setTag(data))
      .then(
        fetch(url + "/tarea/" + id + "/tags", opcions)
          .then((res) => res.json())
          .then((data) => setActualTagsChecked(data))
          .catch((error) => console.log(error))
      )
      .catch((error) => console.log(error));
  };

  //SHOW MODAL COMMENTS
  const showModalComments = (id) => {
    setPopUp({...popUp, viewComments: true, idTask: id});
  };

  useEffect(() => {
    if (popUp.updateTask) {
      const opcions = {
        method: "GET",
        credentials: "include",
      };

      //Consulta para sacar los enum de el tipo de tarea
      fetch(url + "/tarea/" + popUp.idTask, opcions)
        .then((res) => res.json())
        .then((data) => {
          setTaskUpdate([data]);
          setFormState({ ...formState, tipo: data.tipo });
        })
        .then(
          fetch(url + "/tarea/" + popUp.idTask + "/enum")
            .then((res) => res.json())
            .then((data) => setEnums([data]))
            .catch((error) => console.log(error))
        )
        .catch((error) => console.log(error));
    }
  }, [popUp]);

  return (
    <>
      <div className="w-full">
        <div className={`flex justify-end pb-5 ${popUp.updateTask || popUp.createTask || popUp.viewComments ? `z-50 w-full backdrop-blur-sm backdrop-brightness-100` : ``}`}>
          <button
            className="border rounded-md text-lg px-5 py-2 bg-[#0054CD] text-white"
            onClick={openModal}
          >
            Crear tarea
          </button>
        </div>
        {popUp.viewComments ? (
          <div className="">
            <PopUpComments setPopUp={setPopUp} popUp={popUp}/>
          </div>
        ) : null}

        {popUp.updateTask ? (
          <PopUpUpdateTask
            closeTag={setPopUp}
            popUp={popUp}
            taskUpdate={taskUpdate}
            enumsTypes={enumsTypes}
            tag={tag}
            actualTagsChecked={actualTagsChecked}
            idProject={id}
            idUser={logued}
            setAllProjectTasks={setAllProjectTasks}
          />
        ) : null}
        {popUp.createTask ? (
          <PopUpNewTask
            newTareaInProject={newTareaInProject}
            popUp={popUp}
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
            enumsTypes={enumsTypes}
          />
        ) : null}
        {
          <div className="flex justify-start h-4/5">
            <DragDrop
              id={id}
              allProjectTasks={allProjectTasks}
              onDeleteTask={onDeleteTask}
              onUpdateTask={onUpdateTask}
              enumsTypes={enumsTypes}
              setAllProjectTasks={setActualTagsChecked}
              showModalComments={showModalComments}
            />
          </div>
        }
      </div>
    </>
  );
};

export default Project;

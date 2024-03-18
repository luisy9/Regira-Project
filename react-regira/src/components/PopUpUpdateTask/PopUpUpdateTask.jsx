import React, { useEffect, useState } from "react";
import OptionsEnum from "../optionsEnum/OptionsEnum";

export const PopUpUpdateTask = ({
  closeTag,
  popUp,
  taskUpdate,
  enumsTypes,
  tag,
  actualTagsChecked,
  idProject,
  idUser,
  setAllProjectTasks
}) => {
  const url = "http://localhost:3000/api";
  const [formStateUpdate, setFormStateUpdate] = useState({
    tipo: "",
    titulo: "",
    descripcion: "",
    prioridad: "",
    estado: "",
  });

  const [checkTag, setCheckTag] = useState([]);

  useEffect(() => {
    setFormStateUpdate({
      tipo: taskUpdate[0]?.tipo,
      titulo: taskUpdate[0]?.titulo,
      descripcion: taskUpdate[0]?.descripcion,
      prioridad: taskUpdate[0]?.prioridad,
      estado: taskUpdate[0]?.estado,
    });

    setCheckTag((checkTag) => {
      return tag.map((tg, index) => {
        const isTagChecked = actualTagsChecked.some((e) => e.tag === tg.nombre);
        return { ["tag"]: tg.nombre, isChecked: isTagChecked };
      });
    });
  }, [taskUpdate, actualTagsChecked]);

  const onChangeTags = (tag) => {
    setCheckTag((checkTag) => {
      return checkTag.map((tags) => {
        if (tags.tag === tag.tag) {
          return { ["tag"]: tag.tag, isChecked: !tag.isChecked };
        } else {
          return tags;
        }
      });
    });
  };

  const onSubmitUpdate = (value) => {
    event.preventDefault();

    const opcions = {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          ...formStateUpdate,
          usuarios_id: parseInt(idUser),
          author_id: parseInt(idUser),
          proyectos_id: parseInt(idProject),
        },
      ]),
    };
    
    fetch(url + "/tarea/" + popUp.idTask + "/proyecto/" + idProject , opcions)
      .then((res) => res.json())
      .then((data) => setAllProjectTasks(data))
      .catch((error) => console.log(error));
  };

  return (
    <div className="z-50 flex justify-center items-center backdrop-blur-sm absolute top-0 left-0 w-full h-full">
      <div className="border-2 bg-white border-[#0054CD] rounded-md w-2/4 h-2/4 px-2 py-2">
        <div className="flex justify-between">
          <h1 className="text-4xl text-bold">Update User</h1>
          <div
            className="flex justify-center items-center text-2xl hover:bg-slate-200 hover:rounded-md"
            onClick={() =>
              closeTag({ ...popUp, updateTask: false, idTask: null })
            }
          >
            <button className="cursor-pointer px-2 w-10 h-full rounded-full">
              X
            </button>
          </div>
        </div>
        <div className="flex flex-col border">
          <form action="" onSubmit={onSubmitUpdate}>
            {/* Titulo */}
            <div className="">
              <input
                type="text"
                name="titulo"
                value={formStateUpdate.titulo}
                onChange={() =>
                  setFormStateUpdate({
                    ...formStateUpdate,
                    titulo: event.target.value,
                  })
                }
              />
            </div>

            <div className="grid grid-cols-3 border rounded-md px-2 py-1 bg-slate-300">
              {checkTag.map((tag) => {
                return (
                  <>
                    {tag.isChecked ? (
                      <div
                        className={`border rounded-md cursor-pointer my-1 mx-1 bg-[#1E77FF] text-white px-1`}
                        onClick={() =>
                          onChangeTags({
                            tag: tag.tag,
                            isChecked: tag.isChecked,
                          })
                        }
                      >
                        {tag.tag}
                      </div>
                    ) : (
                      <div
                        className="border rounded-md cursor-pointer my-1 mx-1 px-1"
                        onClick={() =>
                          onChangeTags({
                            tag: tag.tag,
                            isChecked: tag.isChecked,
                          })
                        }
                      >
                        {tag.tag}
                      </div>
                    )}
                  </>
                );
              })}
            </div>
            <div className="">
              <select
                onChange={() =>
                  setFormStateUpdate({
                    ...formStateUpdate,
                    tipo: event.target.value,
                  })
                }
              >
                {enumsTypes.enumTipo?.map((tipo) => (
                  <>
                    <option value={tipo}>{tipo}</option>
                  </>
                ))}
              </select>
            </div>
            <div className="">
              <select
                name=""
                id=""
                onChange={() =>
                  setFormStateUpdate({
                    ...formStateUpdate,
                    prioridad: event.target.value,
                  })
                }
              >
                {enumsTypes.enumPrioridad.map((tipo) => (
                  <>
                    <option value={tipo}>{tipo}</option>
                  </>
                ))}
              </select>
            </div>
            <div className="border">
              <select
                name="border"
                id=""
                onChange={() =>
                  setFormStateUpdate({
                    ...formStateUpdate,
                    estado: event.target.value,
                  })
                }
              >
                {enumsTypes.enumEstado.map((tipo) => (
                  <>
                    <option value={tipo}>{tipo}</option>
                  </>
                ))}
              </select>
            </div>
            <div className="w-full">
              <textarea
                type="text"
                name="descripcion"
                className="w-full border rounded-md"
                value={formStateUpdate.descripcion}
                onChange={() =>
                  setFormStateUpdate({
                    ...formStateUpdate,
                    descripcion: event.target.value,
                  })
                }
              ></textarea>
            </div>
            <div className="">
              <button
                className="bg-[#1E77FF] text-white border rounded-md px-2 w-full py-1"
                type="submit"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PopUpUpdateTask;

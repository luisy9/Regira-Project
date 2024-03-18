import React, { useEffect, useState } from "react";
import OptionsEnum from "../optionsEnum/OptionsEnum";

export const PopUpUpdateTask = ({
  closeTag,
  popUp,
  taskUpdate,
  enumsTypes,
  tag,
  actualTagsChecked,
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
      r/* eturn tag.map((tags, index) => {
        const checkedTags = actualTagsChecked.map((e) => {
            console.log(tags.nombre)
          if (e.tag == tags.nombre) {
            return {["tag"]: e.tag, isChecked: true }
          }
        });

        return [ checkedTags, { ["tag"]: tags.nombre, isChecked: false }];
      }); */
    });
  }, [taskUpdate, actualTagsChecked]);

  const onChangeTags = (tag) => {
    console.log(tag);
  };

  const onSubmitUpdate = (id) => {
    event.preventDefault();

    const opcions = {
      method: "PUT",
      credentials: "include",
    };

    fetch(url + "/tarea/" + id, opcions)
      .then((res) => res.json())
      .then((data) => console.log(data))
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
          <form action="" onSubmit={() => onSubmitUpdate(popUp.idTask)}>
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
                console.log(tag);
                return (
                  <>
                    {tag.tag ? (
                      <div className="bg-red-500">{tag.tag}</div>
                    ) : (
                      <div>{tag.tag}</div>
                    )}
                  </>
                );
              })}
            </div>

            <div className="">
              <select>
                {enumsTypes.enumTipo?.map((tipo) => (
                  <>
                    <option value={tipo}>{tipo}</option>
                  </>
                ))}
              </select>
            </div>
            <div className="">
              <select name="" id="">
                {enumsTypes.enumPrioridad.map((tipo) => (
                  <>
                    <option value={tipo}>{tipo}</option>
                  </>
                ))}
              </select>
            </div>
            <div className="">
              <select name="" id="">
                {enumsTypes.enumEstado.map((tipo) => (
                  <>
                    <option value={tipo}>{tipo}</option>
                  </>
                ))}
              </select>
            </div>
            <div className="border rounded-md">
              <textarea
                name="descripcion"
                value={formStateUpdate.descripcion}
                onChange={() =>
                  formStateUpdate({
                    ...formStateUpdate,
                    descripcion: formStateUpdate.descripcion,
                  })
                }
              ></textarea>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PopUpUpdateTask;

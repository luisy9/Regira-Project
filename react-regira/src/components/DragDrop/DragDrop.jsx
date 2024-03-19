import { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DeleteButton from "../deleteButton/DeleteButton";

const ItemType = "ITEM";
const url = "http://localhost:3000/api/";

const Item = ({
  id,
  item,
  caixa,
  setTask,
  task,
  items,
  setItems,
  onDeleteTask,
  onUpdateTask,
}) => {
  const [emailUser, setEmailUser] = useState("");
  const [tag, setTag] = useState([]);

  useEffect(() => {
    const opcions = {
      method: "GET",
      credentials: "include",
    };

    fetch(url + "users/" + item.usuarios_id, opcions)
      .then((res) => res.json())
      .then((email) => setEmailUser(email.email))

      //Llamada a la api para cojer los tags de cada elemento
      .then(
        fetch(url + "tarea/" + item.id + "/tags", opcions)
          .then((res) => res.json())
          .then((data) => {
            setTag([...data]);
          })
          .catch((errorData) => console.log(errorData))
      )
      .catch((error) => console.log(error));
  }, [item]);

  //Drag
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { type: ItemType, id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  //Borramos el item de el state y de la base de datos
  const deleteItem = (id) => {
    const deleteTask = task.filter((item) => item.id !== id);

    //Fetch para hacer delete de la tarea
    const opcions = {
      method: "DELETE",
      credentials: "include",
    };

    //Fetch a delete item
    fetch(url + "tarea/" + id, opcions)
      .then((res) => res.json())
      .then((data) => onDeleteTask(data))
      .catch((error) => console.log(error));
  };

  //Añadir color a las tareas
  const colorTask = () => {
    if (item.prioridad === "High") return "bg-red-400";
    if (item.prioridad === "Medium") return "bg-yellow-400";
    if (item.prioridad === "Low") return "bg-sky-400";
  };

  return (
    <>
      <div
        key={item.estado}
        ref={drag}
        className={`border shadow-lg px-3 my-4 w-full h-44 active:border-2 active:border-[#2681FF] text-black rounded-md cursor-grab`}
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        {/* AAAA{tag[0]?.map(e => <p>{e.tag}</p>)} */}
        <div className="flex justify-between items-center">
          <h1 className="text-bold text-3xl">{item.tipo}</h1>
          <div className="" onClick={() => onUpdateTask(item.id)}>
            <img
              src="/editar.png"
              alt="edit"
              className="w-6 h-6 cursor-pointer"
            />
          </div>
        </div>
        <p className="text-xl">{item.titulo}</p>
        <p className="text-sm">{item.descripcion}</p>
        <div className="flex">
          <div className="flex items-center gap-3">
            <div className={`my-2 border w-fit px-1 rounded-md ${colorTask()}`}>
              <p>{item.prioridad}</p>
            </div>
            <p className="border border-[#2681FF] px-2 rounded-md">
              {emailUser}
            </p>
          </div>
          <div className="flex items-center w-full justify-end">
            <div>
              {caixa === "finished" ? (
                <DeleteButton deleteItem={deleteItem} id={item.id} />
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {tag?.map((e) => {
            return (
              <>
                <p className="border-2 rounded-md px-1 text-bold">
                  #{e?.id === item.id ? e.tag : <></>}
                </p>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

const Box = ({ children, title, mouItem }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemType,
    drop: (item, monitor) => {
      // Obtenir el nom del item que s'ha deixat anar
      const itemName = item.id;
      // Obtain el nom de la caixa on es deixa anar
      const containerTitle = title;
      // Moure l'item d'un lloc a l'altre
      mouItem(itemName, containerTitle);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      dir="ltr"
      className={`h-full ${
        isOver ? "border-x-4 duration-200 border-[#2681FF] rounded-md" : ""
      }`}
      ref={drop}
    >
      <div
        className={`bg-[#F7F8F9] p-8 border rounded-md ${
          title === "Delete" ? "grid place-content-center" : ""
        } ${
          title === "Delete" &&
          isOver &&
          "bg-red-600 bg-opacity-15 border-red-600"
        }`}
      >
        <h2 className={`text-2xl text-start mb-4 text-bold`}>
          {title === "Delete" ? (
            <img src="/eliminar.png" alt="delete" className="w-12 h-12" />
          ) : (
            `${title}`
          )}
        </h2>
        {children}
      </div>
    </div>
  );
};

export const DragDrop = ({
  allProjectTasks,
  id,
  onDeleteTask,
  onUpdateTask,
  enumsTypes,
}) => {
  const [items, setItems] = useState([...allProjectTasks]);
  const [task, setTask] = useState([]);
  const [enumsEstado, setEnumsEstado] = useState([]);
  const [idTarea, setIdTarea] = useState(null);
  const [valueInput, setValueInput] = useState("");

  useEffect(() => {
    if (allProjectTasks.length > 0) {
      setIdTarea(allProjectTasks[0]);

      fetch(url + "tarea/" + idTarea?.id + "/enum")
        .then((res) => res.json())
        .then((data) => setEnumsEstado(data.enumEstado))
        .catch((error) => console.log(error));

      setTask([...allProjectTasks]);
    }
  }, [allProjectTasks]);

  // funció que "Mou" un element d'una caixa a l'altra
  const mouItem = (item, caixa) => {
    const nousItems = items.map((it) => {
      if (it.id === item) {
        it.estado = caixa;
      }
      return it;
    });
    setTask(nousItems);
  };

  //Update DragAnDrope cuando movemos una tarea
  useEffect(() => {
    if (task.length > 0) {
      const opcions = {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      };

      fetch(url + "tarea", opcions)
        .then((res) => res.json())
        .then((data) => setItems(data))
        .catch((error) => console.log(error));
    }
  }, [task]);

  const onChangeTextArea = (value) => {
    setValueInput(value);
  };

  const addTask = () => {
    setTask({ ...task, descripcion: valueInput });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full flex gap-5">
        {enumsTypes.enumEstado?.map((caixa) => (
          <div className="w-full" key={caixa}>
            <Box key={caixa} title={caixa} mouItem={mouItem}>
              {items.length > 0
                ? items
                    .filter((item) => item.estado === caixa)
                    .map((item) => (
                      <>
                        <Item
                          key={item.id}
                          id={item.id}
                          item={item}
                          caixa={caixa}
                          setTask={setTask}
                          task={task}
                          items={items}
                          setItems={setItems}
                          onDeleteTask={onDeleteTask}
                          onUpdateTask={onUpdateTask}
                        />
                      </>
                    ))
                : []}
            </Box>
          </div>
        ))}
      </div>
    </DndProvider>
  );
};

export default DragDrop;

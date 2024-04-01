import { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DeleteButton from "../deleteButton/DeleteButton";
import { useCommentsTest } from "../../hook/useCommentsText";

const ItemType = "ITEM";
const url = "http://localhost:3000/api/";

const Item = ({
  id,
  item,
  caixa,
  task,
  onDeleteTask,
  onUpdateTask,
  showModalComments,
  showModalAddComments,
}) => {
  const [emailUser, setEmailUser] = useState("");
  const [tag, setTag] = useState([]);
  const [comment, setComment] = useState([]);
  // const { setCommentTask } = useCommentsTest();

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

    fetch(url + `/comment/tarea/${item.id}`, opcions)
      .then((res) => res.json())
      .then((comment) => setComment(comment))
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
        <div className="flex">
          <h1 className="text-bold text-3xl">{item.tipo}</h1>
          <div className="flex items-center justify-end gap-3 w-full">
            <div
              className="cursor-pointer"
              onClick={() => onUpdateTask(item.id)}
            >
              <svg
                class="w-7 h-7 text-gray-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M18 5V4a1 1 0 0 0-1-1H8.914a1 1 0 0 0-.707.293L4.293 7.207A1 1 0 0 0 4 7.914V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5M9 3v4a1 1 0 0 1-1 1H4m11.383.772 2.745 2.746m1.215-3.906a2.089 2.089 0 0 1 0 2.953l-6.65 6.646L9 17.95l.739-3.692 6.646-6.646a2.087 2.087 0 0 1 2.958 0Z"
                />
              </svg>
            </div>
            <div
              className="cursor-pointer flex"
              onClick={() => showModalComments(item.id)}
            >
              <div
                className="bg-green-500 border-none rounded-full px-1 absolute w-fit text-xs"
              >
                {comment
                  .map((e) => e.tareas_id === item.id)
                  .reduce(
                    (accumularor, currentValue) => accumularor + currentValue,
                    0
                  )}
              </div>
              <svg
                class="w-7 h-7 text-gray-800 dark:text-black"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="m10.827 5.465-.435-2.324m.435 2.324a5.338 5.338 0 0 1 6.033 4.333l.331 1.769c.44 2.345 2.383 2.588 2.6 3.761.11.586.22 1.171-.31 1.271l-12.7 2.377c-.529.099-.639-.488-.749-1.074C5.813 16.73 7.538 15.8 7.1 13.455c-.219-1.169.218 1.162-.33-1.769a5.338 5.338 0 0 1 4.058-6.221Zm-7.046 4.41c.143-1.877.822-3.461 2.086-4.856m2.646 13.633a3.472 3.472 0 0 0 6.728-.777l.09-.5-6.818 1.277Z"
                />
              </svg>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => showModalAddComments(item.id)}
            >
              <svg
                class="w-7 h-7 text-gray-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M7.556 8.5h8m-8 3.5H12m7.111-7H4.89a.896.896 0 0 0-.629.256.868.868 0 0 0-.26.619v9.25c0 .232.094.455.26.619A.896.896 0 0 0 4.89 16H9l3 4 3-4h4.111a.896.896 0 0 0 .629-.256.868.868 0 0 0 .26-.619v-9.25a.868.868 0 0 0-.26-.619.896.896 0 0 0-.63-.256Z"
                />
              </svg>
            </div>
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
              <div className="">
                <p className="border-2 rounded-md px-1 text-bold">
                  #{e?.id === item.id ? e.tag : <></>}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

const Box = ({ children, title, mouItem, openModal }) => {
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
        {title === "backlog" ? (
          <div
            className="cursor-pointer border rounded-md flex justify-center h-16 items-center bg-[#2581FF] hover:bg-[#0354CD]"
            onClick={openModal}
          >
            <div className="text-3xl text-white">+</div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export const DragDrop = ({
  allProjectTasks,
  onDeleteTask,
  onUpdateTask,
  enumsTypes,
  showModalComments,
  openModal,
  showModalAddComments,
}) => {
  const [items, setItems] = useState([...allProjectTasks]);
  const [task, setTask] = useState([]);
  const [enumsEstado, setEnumsEstado] = useState([]);
  const [idTarea, setIdTarea] = useState(null);

  useEffect(() => {
    if (allProjectTasks.length > 0) {
      setIdTarea(allProjectTasks[0]);

      fetch(url + "tarea/" + idTarea?.id + "/enum")
        .then((res) => res.json())
        .then((data) => setEnumsEstado(data.enumEstado))
        .catch((error) => console.log({ error: error.message }));

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

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full flex gap-5">
        {enumsTypes.enumEstado?.map((caixa) => (
          <div className="w-full">
            <Box
              key={caixa}
              title={caixa}
              mouItem={mouItem}
              openModal={openModal}
            >
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
                          showModalComments={showModalComments}
                          showModalAddComments={showModalAddComments}
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

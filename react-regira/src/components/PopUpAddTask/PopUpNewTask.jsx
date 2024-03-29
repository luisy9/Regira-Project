export const PopUpNewTask = ({
  newTareaInProject,
  popUp,
  setPopUp,
  allUsers,
  formState,
  setFormState,
  usuarioAsignado,
  setUsuarioAsignado,
  tag,
  setTag,
  addTag,
  setAddTag,
  onChangeCheckTag,
  enumsTypes,
}) => {
  return (
    <div className="z-50 flex justify-center items-center absolute top-0 left-0 w-full h-full backdrop-blur-sm backdrop-brightness-100">
      <div className="flex flex-col justify-end border border-[#0054CD] bg-white w-3/6 rounded-md px-5 py-5">
        <div className="flex justify-between">
          <h1 className="text-4xl text-bold">Nueva Tarea</h1>
          <div
            className="flex justify-center items-center text-2xl hover:bg-slate-200 hover:rounded-md"
            onClick={() => setPopUp({ ...popUp, createTask: false })}
          >
            <button className="cursor-pointer px-2 w-10 h-full rounded-full">
              X
            </button>
          </div>
        </div>
        <form
          className="h-full flex flex-col justify-end"
          onSubmit={newTareaInProject}
        >
          <div className="py-3">
            <label className="">Titulo de la tarea: </label>
            <input
              required
              type="text"
              name="titulo"
              className="border rounded-md border-[#0054CD] placeholder:px-1 ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-[#0052CC]"
              placeholder="Titulo de la tarea"
              onChange={() =>
                setFormState({ ...formState, titulo: event.target.value })
              }
            />
          </div>
          <div className="">
            <label>Tag: </label>
            {tag.map((t) => {
              return (
                <div className="" key={t?.id}>
                  <label>{t?.nombre}</label>
                  <input
                    type="checkbox"
                    key={t?.id}
                    onChange={() =>
                      onChangeCheckTag({ [t.id]: event.target.checked })
                    }
                  />
                </div>
              );
            })}
          </div>
          <div className="py-3">
            <label htmlFor="">Tipo tarea: </label>
            <select
              onChange={() =>
                setFormState({ ...formState, tipo: event.target.value })
              }
              value={formState.tipo}
              className="border-2 rounded-md pr-10"
            >
              {enumsTypes.enumTipo?.map((types) => (
                <>
                  <option value={types}>{types}</option>
                </>
              ))}
            </select>
          </div>
          <div className="py-3">
            <label htmlFor="">Prioridad: </label>
            <select
              onChange={() =>
                setFormState({ ...formState, prioridad: event.target.value })
              }
              value={formState.prioridad}
              className="border-2 rounded-md pr-10"
            >
              {enumsTypes.enumPrioridad?.map((types) => (
                <>
                  <option value={types}>{types}</option>
                </>
              ))}
            </select>
          </div>
          <div className="py-3">
            <label htmlFor="">Estado: </label>
            <select
              onChange={() =>
                setFormState({ ...formState, estado: event.target.value })
              }
              value={formState.estado}
              className="border-2 rounded-md pr-10"
            >
              {enumsTypes.enumEstado?.map((types) => (
                <>
                  <option value={types}>{types}</option>
                </>
              ))}
            </select>
          </div>

          <div className="py-3">
            <label htmlFor="">Asignar a un User: </label>
            {usuarioAsignado}
            <select
              required
              onChange={() => setUsuarioAsignado([event.target.value])}
              value={usuarioAsignado[0]}
              className="border-2 rounded-md pr-10"
            >
              {allUsers.length > 0 &&
                allUsers?.map((user) => (
                  <option value={user.id} key={user.id}>
                    {user.email}
                  </option>
                ))}
            </select>
          </div>
          <div className="">
            <textarea
              onChange={() =>
                setFormState({ ...formState, descripcion: event.target.value })
              }
              value={formState.descripcion}
              className="border w-full h-20 rounded-md border-[#0054CD] placeholder:px-2 
                        placeholder:py-1 ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-[#0052CC]"
              placeholder="Añade la descripcion"
            ></textarea>
          </div>
          <div className="w-full pt-3">
            <div className="">
              <button
                type="submit"
                className="w-full border px-5 py-1 rounded-md text-white bg-[#0054CD] hover:bg-[#5793e7]"
              >
                Continuar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopUpNewTask;

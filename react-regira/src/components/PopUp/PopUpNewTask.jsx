export const PopUpNewTask = (
    { newTareaInProject, setPopUp, setTypeTask, typeTask,
        setPriorityTask, priorityTask, setStateTask, stateTask,
        setTitulo, titulo,
        setUsuarioAsignado, usuarioAsignado, allUsers
    }) => {
    return (
        <div className="z-50 flex justify-center items-center absolute top-0 left-0 w-full h-full backdrop-blur-sm">
            <div className="flex flex-col justify-end border border-[#0054CD] bg-white w-3/6 rounded-md px-5 py-5">
                <div className="flex justify-between">
                    <h1 className="text-4xl text-bold">Añade una nueva tarea</h1>
                    <div className="flex justify-center items-center text-2xl hover:bg-slate-200" onClick={() => setPopUp(false)}>
                        <button className="cursor-pointer px-2 w-10 h-full rounded-full">X</button>
                    </div>
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
                        <label className="">Titulo de la tarea: </label>
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
    )
}

export default PopUpNewTask

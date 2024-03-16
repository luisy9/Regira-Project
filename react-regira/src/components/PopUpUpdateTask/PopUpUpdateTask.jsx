export const PopUpUpdateTask = ({ closeTag, popUp, taskUpdate, setFormState, formState, enums, setEnums }) => {

    return (
        <div className="z-50 flex justify-center items-center backdrop-blur-sm absolute top-0 left-0 w-full h-full">
            <div className="border-2 bg-white border-[#0054CD] rounded-md w-2/4 h-2/4 px-2 py-2">
                <div className="flex justify-between">
                    <h1 className="text-4xl text-bold">Update User</h1>
                    <div className="flex justify-center items-center text-2xl hover:bg-slate-200 hover:rounded-md"
                        onClick={() => closeTag({ ...popUp, updateTask: false, idTask: null })}>
                        <button className="cursor-pointer px-2 w-10 h-full rounded-full" >X</button>
                    </div>
                </div>
                <div className="flex flex-col border">
                    <form action="">
                        {
                            taskUpdate.map(task => {
                                return (
                                    <>
                                        <div className="">
                                            {task.tipo ? (
                                                <div className="flex items-center gap-1 border w-fit px-1 rounded-md h-10">
                                                    <h1>Tipo:</h1>
                                                    {
                                                        enums.map(enu => {
                                                            return (
                                                                <div className="" key={enu}>
                                                                    {
                                                                        task.tipo == enu
                                                                            ? (
                                                                                <div className={`border rounded-lg cursor-pointer px-1
                                                                                ${formState.tipo === task.tipo ? `bg-[#0054CD] text-white` : null}`}
                                                                                    onClick={() => setFormState({ ...formState, tipo: task.tipo })}>{task.tipo}
                                                                                </div>
                                                                            )
                                                                            : (
                                                                                <div className={`cursor-pointer border rounded-md px-1
                                                                                ${formState.tipo === enu ? `bg-[#0054CD] text-white` : null}`}
                                                                                    onClick={() => setFormState({ ...formState, tipo: enu })}>{enu}
                                                                                </div>
                                                                            )
                                                                    }
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            ) : null}
                                        </div>

                                        <div className="">
                                            {task.titulo ? <input type="text" name="titulo" value={task.titulo} /> : null}
                                        </div>
                                    </>
                                )
                            })
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PopUpUpdateTask

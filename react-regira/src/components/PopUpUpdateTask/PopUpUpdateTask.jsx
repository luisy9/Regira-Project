import { useState } from "react";

export const PopUpUpdateTask = ({ closeTag, popUp, taskUpdate, setFormState, formState, enums, setEnums }) => {

    const [formStateUpdate, setFormStateUpdate] = useState({
        tipo: 'feature',
        titulo: '',
        descripcion: '',
        prioridad: 'High',
        estado: 'doing',
    });

    const onSubmitUpdate = (id) => {
        event.preventDefault();

        const opcions = {
            method: 'PUT',
            credentials: 'include'
        }

        fetch(url + '/tarea/' + id, opcions)
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))
    }

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
                    <form action="" onSubmit={() => onSubmitUpdate(popUp.idTask)}>
                        {
                            taskUpdate.map(task => {
                                return (
                                    <>
                                        <div className="">
                                            {task.tipo ? (
                                                <div className="flex items-center gap-1 border w-fit px-1 rounded-md h-10">
                                                    <h1>Tipo:</h1>
                                                    {enums.map(e => (
                                                        e.enumTipo.map(tipo => (
                                                            task.tipo == tipo
                                                                ? (
                                                                    <div key={task.tipo} className={`border rounded-lg cursor-pointer px-1
                                                                         ${formState.tipo === task.tipo ? `bg-[#0054CD] text-white` : null}`}
                                                                        onClick={() => setFormState({ ...formState, tipo: task.tipo })}>{task.tipo}
                                                                    </div>
                                                                )
                                                                : (
                                                                    <div key={tipo} className={`cursor-pointer border rounded-md px-1
                                                                         ${formState.tipo === tipo ? `bg-[#0054CD] text-white` : null}`}
                                                                        onClick={() => setFormState({ ...formState, tipo: tipo })}>{tipo}
                                                                    </div>
                                                                )
                                                        ))
                                                    ))}
                                                </div>
                                            ) : null}
                                            {
                                                task.prioridad ? (
                                                    <div className="flex items-center gap-1 border w-fit px-1 rounded-md h-10">
                                                        <h1>Prioridad:</h1>
                                                        {enums.map(e => (
                                                            e.enumPrioridad.map(prioridad => (
                                                                task.prioridad == prioridad
                                                                    ? (
                                                                        <div key={task.prioridad} className={`border rounded-lg cursor-pointer px-1
                                                                             ${formState.prioridad === task.prioridad ? `bg-[#0054CD] text-white` : null}`}
                                                                            onClick={() => setFormState({ ...formState, prioridad: task.prioridad })}>{task.prioridad}
                                                                        </div>
                                                                    )
                                                                    : (
                                                                        <div key={prioridad} className={`cursor-pointer border rounded-md px-1
                                                                             ${formState.prioridad === prioridad ? `bg-[#0054CD] text-white` : null}`}
                                                                            onClick={() => setFormState({ ...formState, prioridad: prioridad })}>{prioridad}
                                                                        </div>
                                                                    )
                                                            ))
                                                        ))}
                                                    </div>
                                                ) : null
                                            }
                                        </div>

                                        <div className="py-2">
                                            {task.titulo ? <input className="border rounded-md" type="text" name="titulo" value={formState.titulo}
                                                onChange={() => setFormState({ ...formState, titulo: event.target.value })} /> : null}
                                        </div>
                                        {
                                            task.estado ? (
                                                <div className="flex items-center gap-1 border w-fit px-1 rounded-md h-10">
                                                    <h1>Prioridad:</h1>
                                                    {enums.map(e => (
                                                        e.enumEstado.map(estado => (
                                                            task.estado == estado
                                                                ? (
                                                                    <div key={task.estado} className={`border rounded-lg cursor-pointer px-1
                                                                             ${formState.estado === task.estado ? `bg-[#0054CD] text-white` : null}`}
                                                                        onClick={() => setFormState({ ...formState, estado: task.estado })}>{task.estado}
                                                                    </div>
                                                                )
                                                                : (
                                                                    <div key={estado} className={`cursor-pointer border rounded-md px-1
                                                                             ${formState.estado === estado ? `bg-[#0054CD] text-white` : null}`}
                                                                        onClick={() => setFormState({ ...formState, estado: estado })}>{estado}
                                                                    </div>
                                                                )
                                                        ))
                                                    ))}
                                                </div>
                                            ) : null
                                        }

                                        <div className="py-2">
                                            {task.descripcion ? <textarea className="border rounded-md" type="text" name="titulo" value={task.descripcion} onChange={() => setFormState({ ...formState, descripcion: event.target.value })} /> : null}
                                        </div>

                                        <div className="">
                                            <button type="submit" className="border rounded-md px-2 py-1 bg-[#0054CD] text-white">Actualizar</button>
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

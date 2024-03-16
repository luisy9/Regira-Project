export const OptionsEnum = ({ nameTipo ,tipo, task, setFormStateUpdate, formStateUpdate }) => {
    console.log(tipo, task, nameTipo)
    return (
        tipo == task
            ? (
                <div key={task.nameTipo} className={`border rounded-lg cursor-pointer px-1
                    ${formStateUpdate.nameTipo === task.nameTipo ? `bg-[#0054CD] text-white` : null}`}
                    onClick={() => setFormStateUpdate({ ...formStateUpdate, [nameTipo]: task.nameTipo })}>{task.nameTipo}
                </div>
            )
            : (
                <div key={tipo} className={`cursor-pointer border rounded-md px-1
                    ${formStateUpdate.nameTipo === tipo ? `bg-[#0054CD] text-white` : null}`}
                    onClick={() => setFormStateUpdate({ ...formStateUpdate, [nameTipo]: tipo })}>{tipo}
                </div>
            )
    )
}

export default OptionsEnum

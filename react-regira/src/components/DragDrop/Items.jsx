import { useState } from "react"

export const Items = ({ addTodo, CAIXES, setValueInput, valueInput }) => {
    // const [valueInput, setValueInput] = useState('');
    const [valueSelect, setValueSelect] = useState('doing');

    function onChangeInput() {
        setValueInput(event.target.value)
    }

    function onChangeSelect() {
        setValueSelect(event.target.value);
    }

    return (
        <div className="w-4/5">
            <div className="">
                <textarea type="text" value={valueInput} id="" className="border-2 w-full
            border-solid rounded-lg border-[#A68AFA] bg-[#A68AFA] bg-opacity-35 p-2 text-white" style={{ height: '100px' }}
                    placeholder="Add new task..."
                    onChange={onChangeInput} />
            </div>
            <div className="flex justify-between pt-1 pb-5">
                <select className="border rounded-md" name="" id="" key='select' onChange={onChangeSelect}>
                    {CAIXES.map((e, index) => {
                        return (
                            <>
                                <option value={e} key={index}>{e}</option>
                            </>
                        )
                    })}
                </select>

                <button className="px-4 py-1 rounded-lg 
                border-none bg-white hover:bg-slate-200"
                    onClick={() => addTodo(valueInput, valueSelect)}>Añadir</button>
            </div>
        </div>
    )
}

export default Items

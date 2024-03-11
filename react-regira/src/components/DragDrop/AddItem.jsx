import { useState } from "react"

export const AddItem = ({ id, addTask, onChangeTextArea, setValueInput, valueInput }) => {

  const [openModal, setOpenModal] = useState(false);


  return (
    <div>
      <div className="flex justify-between">
        {
          !openModal ? <div className="flex justify-between"><button className="border px-5 py-1 bg-[#2681FF] text-white 
          rounded-md hover:shadow-xl" onClick={() => setOpenModal(true)}>Add + </button></div> : <></>
        }
      </div>
      {
        openModal ?
          <div className="z-50 w-96 h-60 bg-red-500">
            <div className="flex justify-end gap-5 pt-3">
              <button onClick={addTask} className="border rounded-md bg-[#2681FF] text-white px-3 py-1">Add +</button>
              <button onClick={() => setOpenModal(false)} className="border rounded-md border-red-500 text-red-500 px-3 py-1">Close</button>
            </div>
          </div> : <></>
      }
    </div>
  )
}

export default AddItem

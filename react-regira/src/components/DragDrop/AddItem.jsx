import { useState } from "react"

export const AddItem = ({ id }) => {

  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <div className="flex justify-between">
        {
          openModal ? <></> : <div className="flex justify-between"><button className="border px-10" onClick={() => setOpenModal(true)}>Add + </button></div>
        }
      </div>
      {
        openModal ?
          <div className="">
            <div className="flex">
              <textarea className="w-full h-20 border rounded-md px-2 py-1 placeholder:text-black border-[#2681FF]" placeholder="Add task..." onChange={}></textarea>
            </div>
            <div className="flex justify-end gap-5 pt-3">
              <button onClick={() => setOpenModal(false)} className="border rounded-md bg-[#2681FF] text-white px-3 py-1">Add +</button>
              <button onClick={() => setOpenModal(false)} className="border rounded-md border-red-500 text-red-500 px-3 py-1">Close</button>
            </div>
          </div> : <></>
      }
    </div>
  )
}

export default AddItem

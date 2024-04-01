import { useState } from "react";

const ViewComments = ({ setPopUp, popUp, addComments }) => {
  const [comment, setComment] = useState('');

  const onChangeComment = (event) => {
    setComment(event.target.value);
  }

  return (
    <div className="z-50 absolute flex justify-center items-center h-full w-full backdrop-blur-sm">
      <div className="bg-white w-1/3 h-96 border rounded-md border-[#2581FF] px-5 py-3">
        <div className="flex justify-between">
          <h1 className="text-3xl">Add comments</h1>
          <div
            className="flex justify-center cursor-pointer w-8 h-fit hover:bg-slate-50 hover:border hover:rounded-md"
            onClick={() =>
              setPopUp({ ...popUp, addComment: false, idTask: null })
            }
          >
            <div className="">
              <svg
                class="w-6 h-6 text-gray-800"
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
                  stroke-width="2"
                  d="M6 18 17.94 6M18 18 6.06 6"
                />
              </svg>
            </div>
          </div>
        </div>
        <form action="">
          <div className="">
            <textarea
              name="comment"
              className="border border-[#2581FF] rounded-md w-full h-20 placeholder:px-1 py-1"
              placeholder="Añade el comentario"
              onChange={onChangeComment}
            ></textarea>
          </div>
          <div className="">
            <button className="bg-[#2581FF] px-5 py-1 text-white border rounded-md" onClick={() => addComments(popUp.idTask, comment)}>
              Añadir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewComments;

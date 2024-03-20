export const PopUpComments = ({ setPopUp, popUp }) => {
  return (
    <div className="w-screen h-full z-50 absolute left-0 top-0 border rounded-md flex justify-center items-center backdrop-blur-sm backdrop-brightness-100">
      <div className="border rounded-md w-96 h-80 bg-white px-5 py-5">
        <div className="flex justify-between">
          <h1>View commment</h1>
          <div
            className="cursor-pointer"
            onClick={() =>
              setPopUp({ ...popUp, viewComments: false, idTask: null })
            }
          >
            X
          </div>
        </div>
        <textarea></textarea>
        <div className="flex">
          <button className="px-5 py-1 border rounded-md bg-[#]">Añadir</button>
        </div>
      </div>
    </div>
  );
};

export default PopUpComments;

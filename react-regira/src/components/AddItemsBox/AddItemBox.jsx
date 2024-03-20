import { useContext } from "react";
import { contextRegira } from "../../context";

export const AddItemBox = () => {
  const { logued, setLogued, user } = useContext(contextRegira);
  return (
    <div className="flex gap-10 border rounded-md bg-[#F7F9F8] w-full h-32">
      <div className="flex justify-center items-center w-full">
        <h1 className="text-3xl">Bienvenido {user.nombre}!👋</h1>
      </div>
    </div>
  );
};

export default AddItemBox;

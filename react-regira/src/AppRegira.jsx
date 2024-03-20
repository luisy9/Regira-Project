import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { contextRegira } from "./context";
import { router } from "./routes";

export const AppRegira = () => {
  const url = "http://localhost:3000/api";
  const loadStorage = document.cookie ? localStorage.getItem("isLogued") : null;
  const [logued, setLogued] = useState(loadStorage);
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (logued) {
      const opcions = {
        method: "GET",
        credentials: "include",
      };

      fetch(url + "/users/" + logued, opcions)
        .then((res) => res.json())
        .then((user) => setUser(user))
        .catch((error) => console.log(error));
    }
  }, [logued]);

  return (
    <contextRegira.Provider value={{ logued, setLogued, user, setUser }}>
      <RouterProvider router={router} />
    </contextRegira.Provider>
  );
};
export default AppRegira;

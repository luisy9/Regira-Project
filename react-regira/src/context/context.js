import { createContext } from "react";

// export const UserContext = createContext();

// export const MiContextoProvider = ({ children }) => {
//   const [token, setToken] = useState('');

//   const updateState = (value) => {
//     setToken(value);
//   };

//   return (
//     <UserContext.Provider value={{ token, updateState }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

export const contextRegira = createContext(null);

export default contextRegira
import { createContext, useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./auth-context";

const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    setSocket(io("http://localhost:4000"));
  }, []);

  useEffect(() => {
    currentUser && socket?.emit("newUser", currentUser.id);
  }, [currentUser, socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("You should use useSocket in SocketContextProvider");
  }

  return context;
};

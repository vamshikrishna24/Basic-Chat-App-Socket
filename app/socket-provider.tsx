"use client";

import {
  createContext,
  useRef,
  use,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";

type SocketContextType = {
  socket: Socket;
  disconnect: () => void;
};

const SocketContext = createContext<SocketContextType | null>(null);

export function SocketProvider({ children }: PropsWithChildren) {
  const socketRef = useRef<Socket | null>(null);
  const [hasSocket, setHasSocket] = useState<boolean | null>(false);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io("http://localhost:8000");
      setHasSocket(true);
    }
  }, []);

  function disconnect() {
    socketRef.current?.disconnect();
    socketRef.current = null;
    setHasSocket(null);
  }

  const value = {
    socket: socketRef.current!,
    disconnect,
  };

  if (hasSocket == false) return "Connecting to socket...";

  if (hasSocket == null) return "No socket connection...";

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}

export function useSocket() {
  const value = use(SocketContext);
  if (!value) throw new Error("Not wrapped with socket provider");
  return value;
}

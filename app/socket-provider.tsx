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
  disconnect: (cb?: () => void) => void;
};

const SocketContext = createContext<SocketContextType | null>(null);

export function SocketProvider({ children }: PropsWithChildren) {
  const socketRef = useRef<Socket | null>(null);
  const [hasSocket, setHasSocket] = useState<boolean | null>(false);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(process.env.NEXT_PUBLIC_SOCKET_URL!);
      setHasSocket(true);
    }
  }, []);

  function disconnect(cb?: () => void) {
    socketRef.current?.disconnect();
    socketRef.current = null;
    setHasSocket(null);
    cb?.();
  }

  const value = {
    socket: socketRef.current!,
    disconnect,
  };

  if (hasSocket == false) return "Connecting to socket...";

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}

export function useSocket() {
  const value = use(SocketContext);
  if (!value) throw new Error("Not wrapped with socket provider");
  return value;
}

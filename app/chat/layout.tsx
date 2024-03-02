import React, { PropsWithChildren } from "react";
import { SocketProvider } from "../socket-provider";

export default function ChatLayout({ children }: PropsWithChildren) {
  return <SocketProvider>{children}</SocketProvider>;
}

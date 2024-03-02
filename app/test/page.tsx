"use client";

import React from "react";
import { useSocket } from "../socket-provider";

export default function page() {
  const { socket } = useSocket();
  return (
    <button
      onClick={() => {
        socket.emit("message", "Bye from nextjs");
      }}
    >
      Say bye to backend
    </button>
  );
}

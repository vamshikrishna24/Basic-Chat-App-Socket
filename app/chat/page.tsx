"use client";

import { useSocket } from "../socket-provider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const roomId = 123;

export default function Home() {
  const { socket, disconnect } = useSocket();
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    socket.on(`listen-message-${roomId}`, (message: string) => {
      setMessages((prev) => [...prev, message]);
    });
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        {messages.map((it) => (
          <p key={it + Math.random()}>{it}</p>
        ))}
      </div>

      <div className="flex flex-row items-center gap-2">
        <input
          className="bg-black text-white"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={() => {
            if (message)
              socket.emit("message", {
                message,
                roomId,
              });
            setMessages((prev) => [...prev, message]);
            setMessage("");
          }}
        >
          send message
        </button>
        <button
          onClick={() =>
            disconnect(() => {
              router.push("/");
            })
          }
        >
          Disconnect
        </button>
      </div>
    </div>
  );
}

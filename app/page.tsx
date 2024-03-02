import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-3xl font-bold">Welcome to chat app</h3>
      <Link href="/chat">Get started</Link>
    </div>
  );
}

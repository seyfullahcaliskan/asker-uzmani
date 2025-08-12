"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold">Çok Yakında Hizmetinizdeyiz !</h1>
      <h1 className="text-3xl font-bold">SPRTech</h1>
      <p className="mt-4 text-lg text-blue-500">{message}</p>
    </main>
  );
}

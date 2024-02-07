"use client";

import Image from "next/image";
import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(email, password);
    await fetch("api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-type": "application/json" },
    });
  }
  return (
    <section className="mt-8">
      <h1 className="text-center mb-4 text-primary text-4xl">Register</h1>
      <form className="block max-w-xs mx-auto" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
        <div className="my-4 text-center text-gray-400">
          or login with provider
        </div>
        <button className="flex gap-4 justify-center items-center">
          <Image src={"/google.png"} alt={"google"} width={32} height={32} />
          Login with google
        </button>
      </form>
    </section>
  );
}

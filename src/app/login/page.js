"use client";
import { signIn } from "next-auth/react";

import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginProgress, setLoginProgress] = useState(false);

  async function handleFormSubmit(event) {
    event.preventDefault();
    setLoginProgress(true);
    await signIn("credentials", { email, password, callbackUrl: "/" });
    setLoginProgress(false);
  }

  return (
    <section className="mt-8">
      <h1 className="text-center mb-4 text-primary text-4xl">Login</h1>
      <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loginProgress}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loginProgress}
        />
        <button type="submit" disabled={loginProgress}>
          Login
        </button>
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

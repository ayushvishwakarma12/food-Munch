"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Header() {
  const [userName, setUserName] = useState("");
  const session = useSession();
  const status = session.status;
  const userData = session.data?.user;
  //console.log(userData);
  let name = userData?.name || userData?.email;

  useEffect(() => {
    fetch("/api/profile").then((response) => {
      response.json().then((data) => {
        setUserName(data.name);
      });
    });
  });

  if (name?.length >= 1) {
    name = userName;
  } else {
    name = userData?.email;
  }

  return (
    <header className="flex items-center justify-between">
      <nav className="flex items-center gap-8 text-gray-500 font-semibold">
        <Link className="text-primary font-semibold text-2xl" href={"/"}>
          ST PIZZA
        </Link>
        <Link href={"/"}>Home</Link>
        <Link href={""}>Menu</Link>
        <Link href={""}>About</Link>
        <Link href={""}>Contact</Link>
      </nav>
      <nav className="flex items-center gap-4 text-gray-500 font-semibold">
        {status === "authenticated" && (
          <>
            <Link className="whitespace-nowrap" href={"/profile"}>
              Hello, {name}
            </Link>
            <button
              onClick={() => signOut()}
              className="bg-primary text-white px-8 rounded-full py-2"
            >
              Logout
            </button>
          </>
        )}
        {status === "unauthenticated" && (
          <>
            <Link href={"/login"}>Login</Link>
            <Link
              href={"/register"}
              className="bg-primary text-white px-8 rounded-full py-2"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

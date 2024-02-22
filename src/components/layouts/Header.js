"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../AppContext";
import ShoppingCart from "@/components/icons/ShoppingCart";
import { usePathname } from "next/navigation";

export default function Header() {
  const [userName, setUserName] = useState("");
  const session = useSession();
  const status = session.status;
  const userData = session.data?.user;

  //console.log(userData);
  let name = userData?.name || userData?.email;
  const { cartProducts } = useContext(CartContext);
  const path = usePathname();

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
    <header className="flex items-center justify-between px-12 py-4">
      <nav className="flex items-center gap-8 text-gray-500 font-semibold">
        <Link className="text-primary font-semibold text-2xl" href={"/"}>
          Food Munch
        </Link>
        <Link
          href={"/"}
          className={path === "/" ? " underline underline-offset-8" : ""}
        >
          Home
        </Link>
        <Link
          href={"/menu"}
          className={path === "/menu" ? " underline underline-offset-8" : ""}
        >
          Menu
        </Link>
        <Link
          href={"/#about"}
          className={path === "/about" ? " underline underline-offset-8" : ""}
        >
          About
        </Link>
        <Link
          href={"/#contact"}
          className={path === "/contact" ? " underline underline-offset-8" : ""}
        >
          Contact
        </Link>
      </nav>
      <nav className="flex items-center gap-4 text-gray-500 font-semibold">
        {status === "authenticated" && (
          <>
            <Link
              className={
                path === "/profile"
                  ? " underline underline-offset-8 whitespace-nowrap"
                  : "whitespace-nowrap"
              }
              href={"/profile"}
            >
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
        {status === "authenticated" && (
          <Link
            href={"/cart"}
            className={
              path === "/cart"
                ? " underline underline-offset-8 relative"
                : "relative"
            }
          >
            <ShoppingCart />
            <span className="absolute -top-2 -right-4 bg-primary text-white text-sm py-1 px-2 rounded-full leading-3">
              {cartProducts?.length}
            </span>
          </Link>
        )}
      </nav>
    </header>
  );
}

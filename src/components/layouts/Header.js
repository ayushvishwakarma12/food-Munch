"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../AppContext";
import ShoppingCart from "@/components/icons/ShoppingCart";
import { usePathname } from "next/navigation";
import Bars from "@/components/icons/Bars";
import Close from "@/components/icons/Close";

export default function Header() {
  const [userName, setUserName] = useState("");
  const session = useSession();
  const status = session.status;
  const userData = session.data?.user;
  const [sidePanel, setSidePanel] = useState(false);

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
    <header className="flex items-center justify-between px-2 md:px-12 py-4">
      <Link
        className="text-primary font-semibold text-lg md:text-2xl mr-4"
        href={"/"}
      >
        Food&nbsp;Munch
      </Link>
      <nav className="hidden md:flex items-center gap-8 text-gray-500 font-semibold">
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
      <nav className="flex items-center gap-2 md:gap-4 text-gray-500 font-semibold ml-auto ">
        {status === "authenticated" && (
          <>
            <Link
              className={
                path === "/profile"
                  ? "hidden md:flex underline underline-offset-8 whitespace-nowrap text-sm md:text-lg"
                  : "hidden md:flex whitespace-nowrap text-sm md:text-lg"
              }
              href={"/profile"}
            >
              Hello, {name}
            </Link>
            <button
              onClick={() => signOut()}
              className="hidden md:block bg-primary text-white text-sm md:text-lg px-4 md:px-8 rounded-full py-2"
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
              className="bg-primary text-white text-sm md:text-lg px-4 md:px-8 rounded-full py-2"
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
      <div className="md:hidden">
        <div className="ml-5" onClick={() => setSidePanel(true)}>
          <Bars />
        </div>

        <div
          className={`top-0 bg-white h-screen fixed w-[200px] right-0 z-20 transition-transform duration-500 ease-in-out ${
            sidePanel ? "open" : "closed"
          }`}
        >
          <div className="flex flex-col p-2 py-5">
            <div className="flex gap-5 items-center">
              <span onClick={() => setSidePanel(false)}>
                <Close />
              </span>
              {status === "authenticated" && (
                <span className=" ml-auto font-normal">Hello, {name}</span>
              )}
            </div>
            <hr className="mt-5 mb-5" />
            <ul className="flex flex-col justify-center items-center text-slate-500 font-semibold leading-8">
              <Link href={"/"} onClick={() => setSidePanel(false)}>
                <li>Home</li>
              </Link>
              <Link href={"/menu"} onClick={() => setSidePanel(false)}>
                <li>Menu</li>
              </Link>
              {status === "authenticated" && (
                <>
                  <Link href={"/profile"} onClick={() => setSidePanel(false)}>
                    <li>Profile</li>
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="block bg-primary text-white w-[100px] text-sm md:text-lg px-4 md:px-8 rounded-2xl py-2"
                  >
                    Logout
                  </button>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

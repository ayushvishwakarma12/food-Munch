"use client";

import { useProfile } from "@/components/UseProfile";
import Right from "@/components/icons/Right";
import UserTabs from "@/components/layouts/UserTabs";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MenuItemsPage() {
  const { loading, data } = useProfile();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  if (loading) {
    return "Loading user info...";
  }

  if (!data.admin) {
    return "Not an admin";
  }
  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <Link
          className="button  hover:bg-white transition-all ease-in-out duration-500"
          href={"/menu-items/new"}
        >
          <span>Create new menu item</span>
          <Right />
        </Link>
      </div>
      <div>
        <h2 className="text-md font-bold text-gray-500 mt-8">
          Edit menu items:
        </h2>
        {menuItems.length > 0 &&
          menuItems.map((item, i) => (
            <Link
              key={i}
              href={"/menu-items/edit/" + item._id}
              className="button mb-2  hover:bg-white transition-all ease-in-out duration-500 leading-8"
            >
              {item.name}
            </Link>
          ))}
      </div>
    </section>
  );
}

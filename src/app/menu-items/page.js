"use client";

import { useProfile } from "@/components/UseProfile";
import Right from "@/components/icons/Right";
import UserTabs from "@/components/layouts/UserTabs";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";

export default function MenuItemsPage() {
  const { loading, data } = useProfile();
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
      fetch("/api/categories").then((res) => {
        res.json().then((categories) => {
          setCategories(categories);
        });
      });
    });
  }, []);

  if (loading) {
    return <Loading className="h-[80vh]" />;
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
        {categories?.length > 0 &&
          categories.map((category, i) => (
            <div>
              <h3 className="text-lg font-normal text-center mt-5 mb-5">
                {category.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {menuItems?.length > 0 &&
                  menuItems
                    .filter((item) => category._id === item.category)
                    .map((item, i) => (
                      <Link
                        key={i}
                        href={"/menu-items/edit/" + item._id}
                        className="button mb-2 p-0 hover:bg-white transition-all ease-in-out duration-500 leading-8 shadow-lg hover:shadow-xl"
                      >
                        {console.log(item)}
                        <div className="flex flex-col justify-center items-center text-center">
                          <img src={item.imageUrl} className=" h-32 w-32" />
                          {item.name}
                        </div>
                      </Link>
                    ))}
              </div>
            </div>
          ))}
        {/* 
        {menuItems.length > 0 &&
          menuItems.map((item, i) => (
            <Link
              key={i}
              href={"/menu-items/edit/" + item._id}
              className="button mb-2  hover:bg-white transition-all ease-in-out duration-500 leading-8 shadow-lg hover:shadow-xl"
            >
              <div className="flex flex-col justify-center items-center text-center">
                <img src={item.imageUrl} className=" h-32 w-32" />
                {item.name}
              </div>
            </Link>
          ))} */}
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useProfile } from "../../../../components/UseProfile";
import UserTabs from "../../../../components/layouts/UserTabs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Left from "@/components/icons/Left";
import { redirect, useParams } from "next/navigation";
import MenuItemPriceProps from "@/components/layouts/MenuItemPriceProps";
import DeleteButton from "@/components/DeleteButton";

export default function EditMenuItemPage() {
  const { id } = useParams();
  const { loading, data } = useProfile();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [redirectToItems, setRedirectToItems] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [sizes, setSizes] = useState([]);
  const [extraIngredientPrices, setExtraIngredeintPrices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((items) => {
        const item = items.find((i) => i._id === id);
        setImageUrl(item.imageUrl);
        setName(item.name);
        setDescription(item.description);
        setBasePrice(item.basePrice);
        setSizes(item.sizes);
        setExtraIngredeintPrices(item.extraIngredientPrices);
        setCategory(item.category);
      });
    });
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => setCategories(categories));
    });
  }, []);

  async function handleFormSubmit(event) {
    event.preventDefault();
    const data = {
      imageUrl,
      name,
      description,
      category,
      basePrice,
      sizes,
      extraIngredientPrices,
      _id: id,
    };
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });
    await toast.promise(savingPromise, {
      loading: "Saving this tasty item",
      success: "Saved",
      error: "Error",
    });

    setRedirectToItems(true);
  }

  async function handleDeleteClick() {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items?_id=" + id, {
        method: "DELETE",
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });
    toast.promise(promise, {
      loading: "Deleting...",
      success: "Deleted",
      error: "Error",
    });
    setRedirectToItems(true);
  }

  if (redirectToItems) {
    return redirect("/menu-items");
  }

  if (loading) {
    return "Loading user info...";
  }

  if (!data.admin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-md mx-auto mt-8">
        <Link className="button" href={"/menu-items"}>
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      <form className="mt-8 max-w-md mx-auto" onSubmit={handleFormSubmit}>
        <div
          className="grid gap-4 items-start"
          style={{ gridTemplateColumns: ".3fr .7fr" }}
        >
          <div className="p-2 rounded-lg">
            <img src={imageUrl} className="" alt="avtar" />
          </div>
          <div className="grow">
            <label>Item name</label>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
            />
            <label>Description</label>
            <input
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              type="text"
            />
            <label>Category</label>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {categories?.length > 0 &&
                categories.map((c) => <option value={c._id}>{c.name}</option>)}
            </select>
            <label>Base price</label>
            <input
              value={basePrice}
              onChange={(event) => setBasePrice(event.target.value)}
              type="text"
            />
            <MenuItemPriceProps
              name={"Sizes"}
              addLabel={"Add item size"}
              props={sizes}
              setProps={setSizes}
            />
            <MenuItemPriceProps
              name={"Extra ingredients"}
              addLabel={"Add ingredeints price"}
              props={extraIngredientPrices}
              setProps={setExtraIngredeintPrices}
            />
            <button type="submit">Save</button>
            <div className="max-w-md mx-auto mt-2">
              <div className="max-w-xs ml-auto pl-4">
                <DeleteButton
                  label="Delete this menu item"
                  onDelete={handleDeleteClick}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

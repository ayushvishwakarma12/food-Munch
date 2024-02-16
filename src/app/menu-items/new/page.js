"use client";

import Link from "next/link";
import { useProfile } from "../../../components/UseProfile";
import UserTabs from "../../../components/layouts/UserTabs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Left from "@/components/icons/Left";
import { redirect } from "next/navigation";
import { DeletePic } from "@/components/utils/Cloudinary";
import { UploadPic } from "@/components/utils/Cloudinary";
import MenuItemPriceProps from "@/components/layouts/MenuItemPriceProps";

export default function NewMenuItemPage() {
  const { loading, data } = useProfile();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [redirectToItems, setRedirectToItems] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [extraIngredientPrices, setExtraIngredeintPrices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  console.log(category);
  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => setCategories(categories));
    });
    return () => {
      if (publicId && !isFormSubmit) {
        console.log("function");
        DeletePic(publicId);
      }
    };
  }, [publicId]);

  async function handleFormSubmit(event) {
    event.preventDefault();
    const data = {
      imageUrl,
      name,
      description,
      basePrice,
      sizes,
      extraIngredientPrices,
      category,
    };
    console.log(sizes, extraIngredientPrices);

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        resolve();
        setIsFormSubmit(true);
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

  function deletePreviousImage() {
    DeletePic(publicId);
  }

  async function handleFileChange(event) {
    console.log(event);
    const files = event.target.files;
    //const arrayBuffer = await files.arrayBuffer();
    //UploadPic(arrayBuffer);

    if (publicId) {
      deletePreviousImage();
    }

    if (files?.length > 0) {
      const promise = new Promise(async (resolve, reject) => {
        const response = await UploadPic(files[0]);
        if (response.secure_url) {
          setImageUrl(response.secure_url);
          setPublicId(response.public_id);
          resolve();
        } else {
          reject();
        }
      });
      toast.promise(promise, {
        loading: "Loading...",
        success: "Pic uploaded successfully",
        error: "Error when uploading",
      });
    }
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
            <label>
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">
                Edit
              </span>
            </label>
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
          </div>
        </div>
      </form>
    </section>
  );
}

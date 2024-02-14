"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import UserTabs from "../../components/layouts/UserTabs";
import { UploadPic, DeletePic } from "../../components/utils/Cloudinary";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const session = useSession();
  const [userName, setUserName] = useState("");
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { status } = session;
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const [publicId, setPublicId] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setPhone(data.phone);
          setStreetAddress(data.streetAddress);
          setPostalCode(data.postalCode);
          setCity(data.city);
          setCountry(data.country);
          setUserName(data.name);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        });
      });
    }
    return () => {
      if (publicId && !isFormSubmit) {
        console.log("function");
        DeletePic(publicId);
      }
    };
  }, [session, status]);

  function deletePreviousImage() {
    DeletePic(publicId);
  }

  async function handleProfileInfoUpdate(event) {
    event.preventDefault();
    setSaved(false);
    setIsSaving(true);
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        imageUrl,
        name: userName,
        streetAddress,
        phone,
        postalCode,
        city,
        country,
      }),
    });
    setIsSaving(false);
    setIsFormSubmit(true);
    if (response.ok) {
      setSaved(true);
    }
  }

  async function handleFileChange(event) {
    const files = event.target.files;

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

  if (status === "loading" || !profileFetched) {
    return "loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }
  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-md mx-auto">
        {saved && (
          <h2 className="text-center bg-green-100 p-4 rounded-lg border border-1 border-green-300">
            Profile Saved!
          </h2>
        )}
        {isSaving && (
          <h2 className="text-center bg-blue-100 p-4 rounded-lg border border-1 border-blue-300">
            Saving...
          </h2>
        )}
      </div>
      <div className="max-w-md mx-auto mt-8">
        <div className="flex gap-2">
          <div className="p-2 rounded-lg">
            <img src={imageUrl} alt="avtar" />
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
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <label>First and Last name</label>
            <input
              type="text"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
              placeholder="First and last name"
            />
            <label>Email</label>
            <input
              type="email"
              value={session?.data?.user?.email}
              disabled={true}
            />
            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
            <label>Street Address</label>
            <input
              type="text"
              placeholder="Street address"
              value={streetAddress}
              onChange={(event) => setStreetAddress(event.target.value)}
            />
            <div className="flex gap-2">
              <div>
                <label>City</label>
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                />
              </div>
              <div>
                <label>Postal Code</label>
                <input
                  type="text"
                  placeholder="Postal code"
                  value={postalCode}
                  onChange={(event) => setPostalCode(event.target.value)}
                />
              </div>
            </div>
            <label>Country</label>
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </section>
  );
}

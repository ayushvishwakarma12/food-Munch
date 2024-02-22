"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import UserTabs from "../../components/layouts/UserTabs";
import { UploadPic, DeletePic } from "../../components/utils/Cloudinary";
import toast from "react-hot-toast";
import UserForm from "@/components/layouts/UserForm";

export default function ProfilePage() {
  const session = useSession();
  const [user, setUser] = useState(null);
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { status } = session;
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const [isFormSubmit, setIsFormSubmit] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setUser(data);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        });
      });
    }
    return () => {
      if (publicId && !isFormSubmit) {
        DeletePic(publicId);
        console.log("pic deleted");
      }
    };
  }, [session, status]);

  function deletePreviousImage() {
    DeletePic(publicId);
  }

  async function handleProfileInfoUpdate(event, data) {
    event.preventDefault();
    setSaved(false);
    setIsSaving(true);
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
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
      <div className=" max-w-7xl mx-auto">
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
      <div className=" max-w-2xl mx-auto mt-8">
        <UserForm
          user={user}
          onSave={handleProfileInfoUpdate}
          handleFileChange={handleFileChange}
          imageUrl={imageUrl}
        />
      </div>
    </section>
  );
}

"use client";

import { useProfile } from "@/components/UseProfile";
import UserForm from "@/components/layouts/UserForm";
import UserTabs from "@/components/layouts/UserTabs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { UploadPic, DeletePic } from "@/components/utils/Cloudinary";
import toast from "react-hot-toast";

export default function EditUserPage() {
  const { loading, data } = useProfile();
  const [user, setUser] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const [isFormSubmit, setIsFormSubmit] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    fetch("/api/users").then((res) => {
      res.json().then((users) => {
        const user = users.find((u) => u._id === id);
        setUser(user);
        setImageUrl(user.imageUrl);
      });
    });
    return () => {
      if (publicId && !isFormSubmit) {
        DeletePic(publicId);
        console.log("pic deleted");
      }
    };
  }, []);

  async function handleSaveButtonClick(event, data) {
    event.preventDefault();

    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, imageUrl, _id: id }),
      });

      if (response.ok) {
        resolve();
        setIsFormSubmit(true);
      } else {
        reject();
      }
    });
    await toast.promise(promise, {
      loading: "Loading...",
      success: "Profile updated",
      error: "Error",
    });
  }

  function deletePreviousImage() {
    DeletePic(publicId);
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

  if (loading) {
    return "Loading user profile...";
  }
  if (!data.admin) {
    return "Not an admin";
  }
  return (
    <section className="mt-8 mx-auto max-w-2xl">
      <UserTabs isAdmin={true} />
      <div className="mt-8">user info form</div>
      {user === null ? (
        "Loading..."
      ) : (
        <UserForm
          user={user}
          onSave={handleSaveButtonClick}
          handleFileChange={handleFileChange}
          imageUrl={imageUrl}
        />
      )}
    </section>
  );
}

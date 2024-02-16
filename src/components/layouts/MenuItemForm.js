import { DeletePic } from "../utils/Cloudinary";
import { UploadPic } from "../utils/Cloudinary";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function MenuItemForm({ menuItem, onSubmit }) {
  const [name, setName] = useState(menuItem?.name);
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const [imageUrl, setImageUrl] = useState(menuItem?.image || "");
  const [publicId, setPublicId] = useState(menuItem?.publicId || "");
  const [isFormSubmit, setIsFormSubmit] = useState(false);

  useEffect(() => {
    return () => {
      if (publicId && !isFormSubmit) {
        DeletePic(publicId);
        console.log(isFormSubmit, "isFormSubmit");
      }
    };
  }, [publicId]);

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
  return (
    <form
      className="mt-8 max-w-md mx-auto"
      onSubmit={(event) =>
        onSubmit(
          event,
          { image, publicId, name, description, basePrice },
          setIsFormSubmit
        )
      }
    >
      <div
        className="grid gap-4 items-start"
        style={{ gridTemplateColumns: ".3fr .7fr" }}
      >
        <div className="p-2 rounded-lg">
          <img src={imageUrl} className="" alt="avtar" />
          <label>
            <input type="file" className="hidden" onChange={handleFileChange} />
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
          <label>Base price</label>
          <input
            value={basePrice}
            onChange={(event) => setBasePrice(event.target.value)}
            type="text"
          />
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}

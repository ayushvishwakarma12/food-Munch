import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "ddkfpnw7u",
  api_key: "511163855398127",
  api_secret: "2uIc-IjrAtv1c7dHOGuzWhtszQQ",
});

export const UploadPic = async (filesData) => {
  const data = new FormData();
  data.append("upload_preset", "food-munch");
  data.append("file", filesData);
  data.append("folder", "food-munch");
  console.log(data);
  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/ddkfpnw7u/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const cloudData = await response.json();
    return cloudData;
  } catch (error) {
    console.log(error);
  }
};

// const buffer = new Uint8Array(arrayBuffer);
// console.log(buffer);
// await new Promise((resolve, reject) => {
//   cloudinary.uploader
//     .upload_stream({}, function (error, result) {
//       if (error) {
//         reject(error);
//         return;
//       }
//       resolve(result);
//       console.log(result);
//     })
//     .end(buffer);
//});

// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
// { public_id: "olympic_flag" },
// function(error, result) {console.log(result); });

export const DeletePic = (publicId) => {
  cloudinary.uploader
    .destroy(publicId, function (error, result) {
      console.log("error", error, "result", result);
    })
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
};

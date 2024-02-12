export default function EditableProfile({ link, setLink }) {
  return async function handleFileChange(event) {
    const files = event.files;

    if (files?.length > 0) {
      const data = new FormData();
      data.set("files", files);
      await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
    }
  };
}

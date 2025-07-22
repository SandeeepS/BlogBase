export const uploadImageToCloudinary = async (
  image: File
): Promise<string | null> => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "blogBase"); 
  const cloudName = import.meta.env.VITE_CLOUDNAME;
  console.log("cloud name is ", cloudName);
  try {
    if (!cloudName) {
      return "cloud name is not avaiblle";
    }
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    if (data.secure_url) return data.secure_url;
    else return null;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    return null;
  }
};

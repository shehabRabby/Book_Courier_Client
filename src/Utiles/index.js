import axios from "axios";
export const imageUpload = async (imageData) => {
  const formData = new FormData();
  formData.append("image", imageData);

  // Construct the full API URL with the secret key
  const image_Api_URL = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_image_host_Key
  }`;

  try {
    const { data } = await axios.post(image_Api_URL, formData);
    return data;
  } catch (error) {
    console.error("Image Upload Error:", error);
    throw new Error("Failed to upload image.");
  }
};

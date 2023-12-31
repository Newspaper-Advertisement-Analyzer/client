import axios from "axios";
import baseURL from "config";

// Function to upload multiple images to the backend
export async function uploadImages(images) {
  const formData = new FormData();
  images.forEach((image) => {
    formData.append("images", image);
  });

  try {
    const response = await axios.post(`${baseURL}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error sending URL to backend:", error);
    throw error;
  }
}

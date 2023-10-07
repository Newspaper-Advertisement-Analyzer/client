import axios from "axios";
import baseURL from "config";

// Function to upload multiple images to the backend
export async function uploadPdfs(pdfs, isImageContained) {
  const formData = new FormData();
  pdfs.forEach((pdf) => {
    formData.append("pdfs", pdf);
  });

  try {
    const response = await axios.post(
      `${baseURL}/uploadpdf?isImageContained=${isImageContained}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error sending URL to backend:", error);
    throw error;
  }
}

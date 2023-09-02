import axios from "axios";

// Function to upload multiple images to the backend
export async function uploadPdfs(pdfs) {
  const formData = new FormData();
  pdfs.forEach((pdf) => {
    formData.append("pdfs", pdf);
  });

  try {
    const response = await axios.post("/uploadpdf", formData, {
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

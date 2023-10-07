import axios from "axios";
import baseURL from "config";

// Function to send the PDF URL to the backend
export async function savePdf(pdfURL, userID, title) {
  try {
    const formData = new FormData();
    formData.append("pdfURL", pdfURL); // Attach the PDF URL
    formData.append("userID", userID); // Include the userID in the form data
    formData.append("title", title);

    const response = await axios.post(`${baseURL}/upload-pdf-url`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending PDF URL to the backend:", error);
    throw error;
  }
}

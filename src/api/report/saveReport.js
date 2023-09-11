import axios from "axios";

// Function to send a PDF to the backend
export async function savePdf(pdf, userID, title) {
  try {
    const formData = new FormData();
    formData.append("pdf", pdf, "report.pdf"); // Attach the PDF with a filename
    formData.append("userID", userID); // Include the userID in the form data
    formData.append("title", title);
    const response = await axios.post("/upload-pdf", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending PDF to the backend:", error);
    throw error;
  }
}

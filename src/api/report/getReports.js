import axios from "axios";

// Function to fetch a saved PDF report from the backend
export async function getReportPdf(reportId) {
  try {
    const response = await axios.get(`/view-pdf?ReportID=${reportId}`, {
      responseType: "blob", // Specify the response type as a blob
    });

    if (response.status === 200) {
      // Create a blob URL for the PDF data
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      // Open the PDF in a new tab
      window.open(url, "_blank");
    } else {
      console.error("Failed to fetch PDF report:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching PDF report:", error);
    throw error;
  }
}

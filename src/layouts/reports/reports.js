import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import { savePdf } from "api/report/saveReport";

export const generateCSV = (data, filename) => {
  const csvContent = "data:text/csv;charset=utf-8," + data.map((row) => row.join(",")).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
};

export const generateExcel = (data, filename) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, `${filename}.xlsx`);
};

// Function to generate PDF
const generatePDF = async (componentsToPrint, contentRef, title) => {
  // Create a new jsPDF instance
  const doc = new jsPDF();

  const pageHeight = doc.internal.pageSize.height;
  let yOffset = 10;

  for (let i = 0; i < componentsToPrint.length; i++) {
    // Skip components that are not rendered (e.g., if they are conditionally displayed)
    if (contentRef.current.children[i]) {
      // Use html2canvas to capture the content of the component
      const canvas = await html2canvas(contentRef.current.children[i]);

      // Check if there's enough space on the current page for the component
      const componentHeight = (canvas.height * 190) / canvas.width; // Calculate component height based on width
      if (yOffset + componentHeight > pageHeight) {
        // If not enough space, add a new page
        doc.addPage();
        yOffset = 10; // Reset yOffset for the new page
      }

      // Convert the captured canvas to a data URL
      const contentDataURL = canvas.toDataURL("image/jpeg");

      // Adjust the position as needed

      // Add the component content as an image to the PDF
      doc.addImage(contentDataURL, "JPEG", 10, yOffset + 15, 190, componentHeight); // Adjust the position and size as needed
      yOffset += componentHeight + 25; // Add vertical spacing between title and component
    }
  }

  // Save the PDF with a file name
  if (title) {
    doc.save(`${title}.pdf`);
  } else {
    doc.save("graphs.pdf");
  }
  const pdfBlob = doc.output("blob");
  const userID = "pu123";
  try {
    // Send the PDF to the backend using the savePdf function
    const response = await savePdf(pdfBlob, userID);

    if (response && response.message) {
      console.log("PDF uploaded successfully!");
    } else {
      console.error("Failed to upload PDF:", response.error);
    }
  } catch (error) {
    console.error("An error occurred while uploading PDF:", error);
  }
};

export default generatePDF;

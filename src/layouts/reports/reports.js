import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";

// Function to generate PDF
const generatePDF = async (componentsToPrint, contentRef) => {
  // Create a new jsPDF instance
  const doc = new jsPDF();

  // Define an array of titles corresponding to each component
  const componentTitles = [
    "Land Sale Average Price",
    "Category Distribution",
    "Marriage Distribution",
    "House Sale Distribution",
    "Chart Example",
  ];
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

      // Add the title above the component
      doc.text(componentTitles[i], 10, yOffset + 5); // Adjust the position as needed

      // Add the component content as an image to the PDF
      doc.addImage(contentDataURL, "JPEG", 10, yOffset + 15, 190, componentHeight); // Adjust the position and size as needed
      yOffset += componentHeight + 25; // Add vertical spacing between title and component
    }
  }

  // Save the PDF with a file name
  doc.save("graphs.pdf");
};

export default generatePDF;

import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";

import { savePdf } from "api/report/saveReport";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const generateCSV = async (data, filename, userID) => {
  let csvContent = "data:text/csv;charset=utf-8,";
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      csvContent += data[i][j];
      if (j !== data[i].length - 1) {
        csvContent += ",";
      }
    }
    if (i !== data.length - 1) {
      csvContent += "\n";
    }
  }

  const encodedUri = encodeURI(csvContent);

  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `${filename}.csv`);
  document.body.appendChild(link);
  link.click();

  const csvBlob = new Blob([csvContent], { type: "text/csv" });
  const csvRef = ref(storage, `Reports/${filename}.csv`);

  try {
    await uploadBytes(csvRef, csvBlob);
    const downloadURL = await getDownloadURL(csvRef);
    const response = await savePdf(downloadURL, userID, filename);

    if (response && response.message) {
      console.log("CSV uploaded successfully!");
    } else {
      console.error("Failed to upload CSV:", response.error);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

// Function to generate Excel
export const generateExcel = async (data, filename, userID) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

  const excelBlob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
  const excelRef = ref(storage, `Reports/${filename}.xlsx`);

  try {
    await uploadBytes(excelRef, excelBlob);
    const downloadURL = await getDownloadURL(excelRef);
    const response = await savePdf(downloadURL, userID, filename);

    if (response && response.message) {
      console.log("Excel uploaded successfully!");
    } else {
      console.error("Failed to upload Excel:", response.error);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

// Helper function to convert string to ArrayBuffer
const s2ab = (s) => {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
  return buf;
};

// Function to generate PDF
const generatePDF = async (componentsToPrint, contentRef, title, user_ID) => {
  try {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    const pageHeight = doc.internal.pageSize.height;
    let yOffset = 10;

    for (let i = 0; i < componentsToPrint.length; i++) {
      if (contentRef.current.children[i]) {
        const canvas = await html2canvas(contentRef.current.children[i]);
        const componentHeight = (canvas.height * 190) / canvas.width;

        if (yOffset + componentHeight > pageHeight) {
          doc.addPage();
          yOffset = 10;
        }

        const contentDataURL = canvas.toDataURL("image/jpeg");
        doc.addImage(contentDataURL, "JPEG", 10, yOffset + 15, 190, componentHeight);
        yOffset += componentHeight + 25;
      }
    }

    // Save the PDF with a file name
    if (!title) {
      title = "graphs.pdf";
    }

    doc.save(`${title}.pdf`);
    const pdfBlob = doc.output("blob");
    const userID = user_ID;
    console.log(userID);
    const pdfRef = ref(storage, `Reports/${title}`);

    // Upload the PDF to Firebase Storage
    await uploadBytes(pdfRef, pdfBlob);

    // Get the download URL of the uploaded PDF
    const downloadURL = await getDownloadURL(pdfRef); // Add this import: import { getDownloadURL } from "firebase/storage";
    // Send the PDF URL to the backend using the savePdf function or do whatever you need with it
    const response = await savePdf(downloadURL, userID, title);

    if (response && response.message) {
      console.log("PDF uploaded successfully!");
    } else {
      console.error("Failed to upload PDF:", response.error);
    }
  } catch (error) {
    console.error("An error occurred while generating/uploading PDF:", error);
  }
};

export default generatePDF;

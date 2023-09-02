import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import { uploadPdfs } from "api/sendPdf"; // Replace with your API endpoint for PDF upload

const PDFUploader = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [backendResponse, setBackendResponse] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;

    // Check if the selected files are PDFs
    const validFiles = Array.from(files).filter((file) =>
      isAllowedFileType(file, "application/pdf")
    );

    setSelectedFiles(validFiles);
  };

  const isAllowedFileType = (file, allowedType) => {
    return file.type === allowedType;
  };

  const handleSubmit = async () => {
    if (selectedFiles.length > 0) {
      try {
        const response = await uploadPdfs(selectedFiles); // Replace with your API call to upload PDFs
        console.log("PDF upload response:", response);
        setBackendResponse(response.message);
      } catch (error) {
        console.error("Error uploading PDFs:", error);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Card
        elevation={3}
        style={{
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        {selectedFiles.length > 0 ? (
          <Typography variant="h6">{`${selectedFiles.length} PDFs selected`}</Typography>
        ) : (
          <div>
            <Typography variant="h6">Drag and drop PDFs here</Typography>
            <Typography variant="subtitle1">or</Typography>
          </div>
        )}

        <input
          accept=".pdf"
          id="pdf-input"
          type="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
          multiple // Allow multiple file selection
        />
        <label htmlFor="pdf-input">
          <MDButton color="primary" component="span" style={{ marginTop: "10px" }}>
            Upload PDFs
          </MDButton>
        </label>
      </Card>
      <MDButton color="primary" onClick={handleSubmit} style={{ marginTop: "10px" }}>
        Submit
      </MDButton>
      {backendResponse.length > 0 && (
        <MDBox mt={5} mb={3} alignItems="center" fullWidth>
          {backendResponse.map((responseItem, index) => (
            <div key={index}>
              <MDTypography color="primary" mb={3}>
                PDF {index + 1}
              </MDTypography>
              <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
                <MDTypography variant="body1">Locations: {responseItem[0].join(", ")}</MDTypography>
              </Card>
              <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
                <MDTypography variant="body1">Category: {responseItem[1]}</MDTypography>
              </Card>
              <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
                <MDTypography variant="body1">
                  Phone Numbers: {responseItem[2].join(", ")}
                </MDTypography>
              </Card>
              <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
                <MDTypography variant="body1">Price: {responseItem[3]}</MDTypography>
              </Card>
            </div>
          ))}
        </MDBox>
      )}
    </Container>
  );
};

export default PDFUploader;
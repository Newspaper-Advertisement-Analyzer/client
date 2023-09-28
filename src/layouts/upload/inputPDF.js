import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Switch, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import { uploadPdfs } from "api/sendPdf"; // Replace with your API endpoint for PDF upload
import { useAppState } from "utils/userContext";

const PDFUploader = () => {
  // const [selectedFiles, setSelectedFiles] = useState([]);
  // const [backendResponse, setBackendResponse] = useState([]);
  // const [imageScan, setImageScan] = useState(false);
  const { state } = useAppState();

  const selectedFiles = state.selectedPdfFiles;
  const setSelectedFiles = state.setSelectedPdfFiles;
  const backendResponse = state.pdfBackendResponse;
  const setBackendResponse = state.setpdfBackendResponse;
  const imageScan = state.imageScan;
  const setImageScan = state.setImageScan;
  const navigate = useNavigate();

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
        const response = await uploadPdfs(selectedFiles, imageScan); // Replace with your API call to upload PDFs
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
        <MDBox display="flex" alignItems="center" mt={5}>
          <MDBox>
            <MDTypography variant="button" fontWeight="regular" color="dark">
              Does PDF contain Scanned Images?
            </MDTypography>
          </MDBox>
          <MDBox>
            <Switch checked={imageScan} onChange={() => setImageScan(!imageScan)} />
          </MDBox>
        </MDBox>
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
                <div
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <MDTypography variant="body1">
                    Locations: {responseItem[0].join(", ")}
                  </MDTypography>
                  <MDButton
                    color="primary"
                    onClick={() => {
                      // Define the query parameter object with the locations
                      const queryParams = {
                        locations: responseItem[0].join(", "),
                      };

                      // Navigate to the '/advertisement_map' route with query parameters
                      navigate(`/advertisement_map?locations=${queryParams.locations}`);
                    }}
                  >
                    View Locations
                  </MDButton>
                </div>
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

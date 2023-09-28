import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import MDButton from "components/MDButton";

import { uploadImages } from "api/sendImg";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useAppState } from "utils/userContext";

const ImageUploader = () => {
  // const [selectedFiles, setSelectedFiles] = useState([]);
  // const [imagePreviews, setImagePreviews] = useState([]);
  // const [backendResponse, setBackendResponse] = useState([]);
  const { state } = useAppState();
  const selectedFiles = state.selectedFiles;
  const setSelectedFiles = state.setSelectedFiles;
  const imagePreviews = state.imagePreviews;
  const setImagePreviews = state.setImagePreviews;
  const backendResponse = state.imgBackendResponse;
  const setBackendResponse = state.setimgBackendResponse;

  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const files = event.target.files;

    // Check if the selected files are of allowed types
    const validFiles = Array.from(files).filter((file) => isAllowedFileType(file));

    setSelectedFiles(validFiles);

    // Generate image previews for the selected files
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImagePreviews((prevPreviews) => [...prevPreviews, reader.result]);
      };
    });
  };

  const isAllowedFileType = (file) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    return allowedTypes.includes(file.type);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;

    // Check if the dropped files are of allowed types
    const validFiles = Array.from(files).filter((file) => isAllowedFileType(file));

    setSelectedFiles(validFiles);

    // Generate image previews for the dropped files
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImagePreviews((prevPreviews) => [...prevPreviews, reader.result]);
      };
    });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async () => {
    if (selectedFiles.length > 0) {
      try {
        const response = await uploadImages(selectedFiles);
        console.log("Image upload response:", response);
        setBackendResponse(response.message);
      } catch (error) {
        console.error("Error uploading images:", error);
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
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {imagePreviews.length > 0 ? (
          <div>
            {imagePreviews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Image Preview ${index}`}
                style={{ maxWidth: "20%", maxHeight: "200px", marginBottom: "10px" }}
              />
            ))}
          </div>
        ) : selectedFiles.length > 0 ? (
          <Typography variant="h6">{`${selectedFiles.length} files selected`}</Typography>
        ) : (
          <div>
            <Typography variant="h6">Drag and drop images here</Typography>
            <Typography variant="subtitle1">or</Typography>
          </div>
        )}

        <input
          accept="image/jpeg,image/png"
          id="image-input"
          type="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
          multiple // Allow multiple file selection
        />
        <label htmlFor="image-input">
          <MDButton color="primary" component="span" style={{ marginTop: "10px" }}>
            Upload Images
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
                Advertisement {index + 1}
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
          {/* <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
            <MDTypography variant="body1">
              Locations: {backendResponse[0][0].join(", ")}
            </MDTypography>
          </Card>
          <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
            <MDTypography variant="body1">Phone Numbers: {backendResponse[0][1]}</MDTypography>
          </Card>
          <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
            <MDTypography variant="body1">Category: {backendResponse[0][2]}</MDTypography>
          </Card>
          <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
            <MDTypography variant="body1">Price: {backendResponse[0][3]}</MDTypography>
          </Card> */}
        </MDBox>
      )}
    </Container>
  );
};

export default ImageUploader;

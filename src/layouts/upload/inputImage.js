import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import axios from "axios";
import Card from "@mui/material/Card";
import MDButton from "components/MDButton";

const ImageUploader = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

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
      const formData = new FormData();

      selectedFiles.forEach((file) => {
        formData.append("images", file);
      });

      try {
        const response = await axios.post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Image upload response:", response.data);
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
    </Container>
  );
};

export default ImageUploader;

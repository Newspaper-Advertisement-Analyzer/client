import React, { useState } from "react";
import { Container, Paper, Typography, Button } from "@mui/material";
import axios from "axios";

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Check if the selected file is of an allowed type
    if (file && isAllowedFileType(file)) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const isAllowedFileType = (file) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    return allowedTypes.includes(file.type);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    if (file && isAllowedFileType(file)) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);

      try {
        const response = await axios.post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Image upload response:", response.data);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        style={{
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {selectedFile ? (
          <Typography variant="h6">{selectedFile.name}</Typography>
        ) : (
          <div>
            <Typography variant="h6">Drag and drop an image</Typography>
            <Typography variant="subtitle1">or</Typography>
          </div>
        )}

        <input
          accept="image/jpeg,image/png"
          id="image-input"
          type="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <label htmlFor="image-input">
          <Button
            variant="outlined"
            component="span"
            style={{ marginTop: "10px" }}
          >
            Upload Image
          </Button>
        </label>
      </Paper>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ marginTop: "10px" }}
      >
        Submit
      </Button>
    </Container>
  );
};

export default ImageUploader;

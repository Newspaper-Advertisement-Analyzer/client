import React from "react";
import PropTypes from "prop-types";

import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
// import signinimage from "../../../upload/signin.gif";
import MDBox from "components/MDBox";
import { useState } from "react";
// import { Link } from "react-router-dom";

function ProfileModal({ open, onClose, image, setImage }) {
  const [selectedImage, setSelectedImage] = useState(image); // State to hold the selected image

  // Function to handle file input change
  const handleUpload = () => {
    setImage(selectedImage);
    onClose();
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImage(e.target.result); // Update the selected image in the state
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} mt={5}>
              <MDTypography variant="h3" fontWeight="medium" textAlign="center">
                Update the Profile Picture
              </MDTypography>

              <MDBox display="flex" justifyContent="center" alignItems="center">
                <img
                  src={selectedImage}
                  alt="undraw-Add-user-re-5oib"
                  border="0"
                  style={{ width: "400px", height: "auto" }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12}></Grid>

            <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ marginTop: "10px" }}
              />
              <MDButton variant="gradient" color="info" size="medium" onClick={handleUpload}>
                Upload
              </MDButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Modal>
  );
}

ProfileModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  setImage: PropTypes.func.isRequired,
};

export default ProfileModal;

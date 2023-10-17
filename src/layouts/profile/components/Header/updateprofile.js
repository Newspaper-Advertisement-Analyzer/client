import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import { storage } from "../../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useUser } from "utils/userContext";
import { updateProfilePicture } from "api/updateUser/updateUser";

function ProfileModal({ open, onClose, image, setImage }) {
  const [selectedImage, setSelectedImage] = useState(image); // State to hold the selected image
  const [imageUpload, setImageUpload] = useState(null); // State to hold the uploaded image
  const { user } = useUser();

  // Function to handle file input change
  const handleUpload = async () => {
    console.log(user);
    try {
      // Upload selectedImage to Firebase storage
      const imageRef = ref(storage, `profile-picture/${user.user_ID}`); // Define the reference to the image
      await uploadBytes(imageRef, imageUpload); // Upload the image bytes

      // Get the download URL
      const url = await getDownloadURL(imageRef);
      // Call setImage with the download URL to update the image
      updateProfilePicture(url, user.user_ID);
      setImage(url);

      onClose();
    } catch (error) {
      console.error("Error uploading image to Firebase storage:", error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        // Ensure that the result is set to the selectedImage state
        setSelectedImage(e.target.result);
        setImageUpload(file); // Set the uploaded image in the state
      };

      // Read the file as a data URL
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

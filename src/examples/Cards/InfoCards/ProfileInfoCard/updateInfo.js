import React, { useState } from "react";
import PropTypes from "prop-types";

import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { updateUser } from "api/updateUser/updateUser";
import { useUser } from "utils/userContext";

function UpdateInfoModal({ open, onClose, onSave, initialValues, setChangePassword }) {
  const [formData, setFormData] = useState(initialValues);
  // const [changePassword, setChangePassword] = useState(false); // State to hold the change password checkbox value
  const { user } = useUser();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    // eslint-disable-next-line no-unused-vars
    const { password, ...formDataToSave } = formData;
    onSave(formDataToSave);

    try {
      const userId = user.user_ID; // Extract the user ID from the form data
      const { fullName, mobile, profession, location, password } = formData;
      console.log(formData);
      const userData = { fullName, mobile, profession, location, password, userId };
      const response = await updateUser(userData); // Call the updateUser API function

      // Check if the password was updated
      if (response && response.password_updated) {
        setChangePassword(true); // Reset the change password checkbox
        // You can use a state or a notification library here to show the message to the user
        console.log("Password has been updated.");
      }

      onClose(); // Close the modal after the update is successful
    } catch (error) {
      console.error("Error updating user information:", error);
      // Handle the error as needed
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
            <Grid item xs={12}>
              <MDTypography variant="h6" fontWeight="medium">
                Update Personal Information
              </MDTypography>
            </Grid>
            <Grid item xs={12}>
              <form>
                <MDInput
                  type="text"
                  label="Full Name"
                  name="fullName"
                  fullWidth
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
                <div style={{ marginBottom: "5%" }}></div>
                <MDInput
                  type="tel"
                  label="Mobile"
                  name="mobile"
                  fullWidth
                  value={formData.mobile}
                  onChange={handleInputChange}
                />
                <div style={{ marginBottom: "5%" }}></div>
                <MDInput
                  type="text"
                  label="Profession"
                  name="profession"
                  fullWidth
                  value={formData.profession}
                  onChange={handleInputChange}
                />
                <div style={{ marginBottom: "5%" }}></div>
                <MDInput
                  type="text"
                  label="location"
                  name="location"
                  fullWidth
                  value={formData.location}
                  onChange={handleInputChange}
                />
                {/* Add more fields as needed */}
              </form>
            </Grid>
            <Grid item xs={12}>
              <MDTypography variant="h6" fontWeight="medium">
                Change Account Password
              </MDTypography>
            </Grid>
            <Grid item xs={12}>
              <form>
                <MDInput
                  type="password"
                  label="New Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <div style={{ marginBottom: "2%" }}></div>
              </form>
            </Grid>
            <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-end" }}>
              <MDButton color="primary" onClick={handleSave}>
                Save
              </MDButton>
              <div style={{ marginRight: "2%" }}></div>
              <MDButton color="secondary" onClick={onClose}>
                Cancel
              </MDButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Modal>
  );
}

UpdateInfoModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  setChangePassword: PropTypes.func.isRequired,
};

export default UpdateInfoModal;

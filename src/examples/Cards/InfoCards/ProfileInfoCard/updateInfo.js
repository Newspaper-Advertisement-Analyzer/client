import React, { useState } from "react";
import PropTypes from "prop-types";

import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

function UpdateInfoModal({ open, onClose, onSave, initialValues }) {
  const [formData, setFormData] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
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
                  name="Mobile"
                  fullWidth
                  value={formData.mobile}
                  onChange={handleInputChange}
                />
                <div style={{ marginBottom: "5%" }}></div>
                <MDInput
                  type="text"
                  label="Profession"
                  name="Profession"
                  fullWidth
                  value={formData.profession}
                  onChange={handleInputChange}
                />
                <div style={{ marginBottom: "5%" }}></div>
                <MDInput
                  type="text"
                  label="location"
                  name="Location"
                  fullWidth
                  value={formData.location}
                  onChange={handleInputChange}
                />
                {/* Add more fields as needed */}
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
};

export default UpdateInfoModal;

import React from "react";
import PropTypes from "prop-types";

import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import signinimage from "./signin.gif";
import MDBox from "components/MDBox";
import { Link } from "react-router-dom";

function SignInModal({ open, onClose }) {
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
                Explore Extended Features Personalized For You.
              </MDTypography>
              <MDTypography variant="h3" fontWeight="medium" textAlign="center">
                Join With Us
              </MDTypography>
              <MDBox display="flex" justifyContent="center" alignItems="center">
                <img src={signinimage} alt="undraw-Add-user-re-5oib" border="0" />
              </MDBox>
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
              <MDButton
                variant="gradient"
                color="info"
                component={Link}
                to={"/authentication/sign-up"}
                size="large"
              >
                Sign Up
              </MDButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Modal>
  );
}

SignInModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SignInModal;

import React, { useState } from "react";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-reset-cover.jpeg";
import baseURL from "config";
import { useNavigate } from "react-router-dom";
import MDAlert from "components/MDAlert";
import VerificationDialog from "layouts/authentication/sign-up/VerificationDialog";

function ResetPSW() {
  const [email, setEmail] = useState("");
  const [verificationOpen, setVerificationOpen] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const navigate = useNavigate();

  const handleSend = () => {
    console.log(email);
    if (email === "") {
      alert("Please enter email");
      return;
    }

    // Send the email to the backend
    fetch(`${baseURL}/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        response.json();
      })

      .then((data) => {
        console.log("this is verification", data);
        setVerificationOpen(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <CoverLayout coverHeight="50vh" image={bgImage}>
      {showSuccessAlert && (
        <MDAlert color="success" dismissible>
          entered code is correct
        </MDAlert>
      )}
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
            Reset Password
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            You will receive a temporary password
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={4}>
              <MDInput
                type="email"
                label="Email"
                variant="standard"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
              />
            </MDBox>
            <MDBox mt={6} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleSend}>
                SEND CODE
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      {verificationOpen && (
        <VerificationDialog
          open={verificationOpen}
          onClose={() => setVerificationOpen(false)}
          email={email} // Pass the email to the dialog
          onSuccess={() => {
            // Handle successful verification if needed
            setShowSuccessAlert(true);
            setTimeout(() => {
              setShowSuccessAlert(false);
              navigate(`/authentication/sign-in`);
            }, 1000);
          }}
          address={"verify-email"}
        />
      )}
    </CoverLayout>
  );
}

export default ResetPSW;

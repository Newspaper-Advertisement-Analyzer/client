// react-router-dom components
import React, { useState } from "react";
// import axios from "axios";

import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";

// Authentication layout components
import BasicLayout from "../components/BasicLayout";

// Images
import bgImage from "assets/images/newspaper2.jpg";

import VerificationDialog from "./VerificationDialog";
import { useNavigate } from "react-router-dom";
// import { useUser } from "utils/userContext";
import baseURL from "config";
import TermModal from "./term";

function Cover() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  // const { login } = useUser();

  const [verificationOpen, setVerificationOpen] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");

  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleRegister = () => {
    console.log("email: ", email);
    console.log("password: ", password);
    console.log("name: ", name);

    if (email === "" || password === "" || name === "") {
      alert("Please fill all the fields");
      return;
    }

    const namePattern = /^[A-Za-z0-9_.-]+( [A-Za-z0-9_.-]+)*$/;
    if (!namePattern.test(name)) {
      setNameError("Invalid name");
      return;
    } else {
      setNameError("");
    }
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      setEmailError("Invalid email address");
      return;
    } else {
      setEmailError("");
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    } else {
      setPasswordError("");
    }

    fetch(`${baseURL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    })
      .then((response) => {
        if (response.status === 409 || response.status === 500) {
          return response.json().then((data) => {
            alert(data.error);
          });
        } else {
          return response.json().then((data) => {
            console.log(data);
            const userData = data.user;
            console.log(userData);
            setVerificationOpen(true);

            // navigate("/dashboard");
          });
        }
      })
      .catch((error) => {
        console.log(error, "error");
        alert("An error occurred during registration.");
      });
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <BasicLayout image={bgImage}>
      {showSuccessAlert && (
        <MDAlert color="success" dismissible>
          Registration Successful!
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
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your credentials to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Name"
                variant="standard"
                fullWidth
                onChange={(e) => setName(e.target.value)}
                required
              />
              {nameError && <p style={{ color: "red", fontSize: "14px" }}>{nameError}</p>}
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                variant="standard"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {emailError && <p style={{ color: "red", fontSize: "14px" }}>{emailError}</p>}
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                variant="standard"
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {passwordError && <p style={{ color: "red", fontSize: "14px" }}>{passwordError}</p>}
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox onChange={(e) => setTermsAccepted(e.target.checked)} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                // component="a"
                // href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
                onClick={handleOpenModal}
              >
                Terms and Conditions
              </MDTypography>
              <TermModal open={isModalOpen} onClose={handleCloseModal} />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                onClick={handleRegister}
                disabled={!termsAccepted}
              >
                sign up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
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
              navigate("/dashboard");
            }, 1000);
          }}
          address={"verify"}
        />
      )}
    </BasicLayout>
  );
}

export default Cover;

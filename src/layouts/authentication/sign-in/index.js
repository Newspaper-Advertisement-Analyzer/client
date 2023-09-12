/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

import GoogleButton from "react-google-button";
import { auth, provider } from "../../../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useUser } from "utils/userContext";

function Basic() {
  const { login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const handleForgetPassword = () => {};
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email);
      console.log(value);
      // navigate("/");
    });
  };

  // const handleLogin = () => {
  //   if (!email || !password) {
  //     alert("Please enter both email and password");
  //     return;
  //   }
  //   fetch("/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email: email,
  //       password: password,
  //     }),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw response.status;
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       // Display a success message if applicable
  //       login({ name: email, role: "user" });
  //       navigate("/dashboard");
  //     })
  //     .catch((status) => {
  //       console.log(status, "error");
  //       if (status === 400) {
  //         alert("Email and password are required.");
  //       } else if (status === 401) {
  //         alert("Invalid User Name or Incorrect Password.");
  //       } else {
  //         alert("An error occurred during login.");
  //       }
  //     });
  // };
  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw response.status;
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.user) {
          // Display a success message if applicable
          const userData = data.user;
          console.log(userData);
          login({
            name: userData.User_Name,
            full_name: userData.Full_Name,
            role: userData.Role,
            email: userData.email,
            phone_Number: userData.Contact_Number,
            profession: userData.Profession,
          });
          // Now you can use userData as needed in your frontend
          // For example, you can store it in state or context for later use
          // login({ name: userData.User_Name, role: "user" });
          navigate("/dashboard");
        } else {
          alert("User data not found in the response.");
        }
      })
      .catch((status) => {
        console.log(status, "error");
        if (status === 400) {
          alert("Email and password are required.");
        } else if (status === 401) {
          alert("Invalid User Name or Incorrect Password.");
        } else {
          alert("An error occurred during login.");
        }
      });
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        {/* <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox> */}
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
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDTypography
            textAlign="center"
            variant="h4"
            fontWeight="medium"
            color="black"
            mt={1}
            mb={5}
          >
            Hi Welcome Back!
          </MDTypography>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
              />
            </MDBox>
            <MDBox display="flex" flexDirection="row" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleForgetPassword}
                sx={{ cursor: "pointer", userSelect: "none", mr: 1, flex: 1, textAlign: "right" }}
              >
                &nbsp;&nbsp;Forget Password ?
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton color="primary" fullWidth onClick={handleLogin}>
                Log in
              </MDButton>
            </MDBox>

            <MDBox
              mt={4}
              mb={1}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", textAlign: "center" }}
              >
                &nbsp;&nbsp;Or
              </MDTypography>
              <div className="g-signin2" data-width="300" data-height="200" data-longtitle="true">
                <GoogleButton
                  className="g-signin2"
                  data-width="300"
                  data-height="200"
                  data-longtitle="true"
                  onClick={handleClick}
                />
              </div>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;

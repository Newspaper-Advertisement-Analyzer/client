import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
// import Switch from "@mui/material/Switch";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/newspaper1.jpg";

import GoogleButton from "react-google-button";
import { auth, provider } from "../../../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useUser } from "utils/userContext";
import baseURL from "../../../config";

function Basic() {
  const { login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const [rememberMe, setRememberMe] = useState(false);

  // const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleForgetPassword = () => {
    navigate("/authentication/reset-password");
  };

  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email);
      console.log(value);
      // navigate("/");
    });
  };

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }
    fetch(`${baseURL}/login`, {
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
          login({
            name: userData.User_Name,
            full_name: userData.Full_Name,
            user_ID: userData.UserID,
            role: userData.Role,
            email: userData.email,
            phone_Number: userData.Contact_Number,
            profession: userData.Profession,
            Profile_Picture: userData.Profile_Picture,
            Last_Seen: userData.Last_Seen,
          });
          // if (rememberMe) {
          //   Cookies.set("user_id", userData.UserID, { expires: 365 }); // The cookie expires in 365 days
          // }
          navigate("/dashboard");
        } else {
          alert("User data not found in the response.");
        }
      })
      .catch((status) => {
        if (status === 400) {
          alert("Email and password are required.");
        } else if (status === 401) {
          alert("Invalid User Name or Incorrect Password.");
        } else {
          alert("Check your Network Connection");
        }
      });
  };

  return (
    <BasicLayout image={bgImage}>
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
            Welcome Back
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to log in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                id="email"
                type="email"
                label="Email"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                id="password"
                type="password"
                label="Password"
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
              />
            </MDBox>
            <MDBox display="flex" flexDirection="row" alignItems="center" ml={-1}>
              {/* <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography> */}
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
              <MDButton id="sign-in-button" color="primary" fullWidth onClick={handleLogin}>
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

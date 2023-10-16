import React from "react";
import Buttons from "../Components/Buttons";
import IMAGES from "../Assets/Images";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <MDBox>
      <header className="header">
        <MDBox mt={25}></MDBox>
        <div className="header__img">
          <img src={IMAGES.logo} alt="logo" />
        </div>
        <MDTypography color="text" variant="h2" textAlign="center">
          Uncovering Trends in Advertising
        </MDTypography>
        <MDTypography color="text" variant="h4" textAlign="center" fontWeight="regular">
          Discover the power of data-driven analysis with our Newspaper Advertisement Analyzer.
          Decode ad trends, demographics, and more with precision and ease.
        </MDTypography>
        <MDBox mt={5}>
          <MDButton
            color="info"
            size="large"
            variant="gradient"
            type="submit"
            component={Link}
            to={"/extractor"}
            endIcon={<SendIcon />}
          >
            Get Started
          </MDButton>
        </MDBox>
        <MDBox mt={30}></MDBox>
        <Buttons />
      </header>
    </MDBox>
  );
}

export default Hero;

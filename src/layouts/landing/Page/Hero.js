import React from "react";
import Buttons from "../Components/Buttons";
import IMAGES from "../Assets/Images";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";

function Hero() {
  return (
    <MDBox>
      <header className="header">
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

        <Buttons />
      </header>
    </MDBox>
  );
}

export default Hero;

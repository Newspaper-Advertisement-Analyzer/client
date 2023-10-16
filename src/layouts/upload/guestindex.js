import React from "react";

import CenteredTabs from "./tabs";
import MDBox from "components/MDBox";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

function GuestExtractor() {
  return (
    <>
      <DefaultNavbar />
      <MDBox p={10}>
        <MDBox mt={5}>
          <CenteredTabs />
        </MDBox>
      </MDBox>
    </>
  );
}

export default GuestExtractor;

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import React from "react";

function Buttons() {
  return (
    <>
      <MDBox className="buttons">
        <MDTypography component="a" href="" variant="h5" color="light">
          About
        </MDTypography>
        <MDTypography component="a" href="" variant="h5" color="light">
          Technologies
        </MDTypography>
        <MDTypography component="a" href="" variant="h5" color="light">
          Users
        </MDTypography>
        <MDTypography component="a" href="" variant="h5" color="light">
          Team
        </MDTypography>
      </MDBox>
    </>
  );
}

export default Buttons;

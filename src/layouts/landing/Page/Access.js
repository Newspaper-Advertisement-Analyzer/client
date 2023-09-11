import React from "react";
import IMAGES from "../Assets/Images";
import MDTypography from "components/MDTypography";

function Access() {
  return (
    <>
      <section className="access">
        <MDTypography color="text" variant="h2" textAlign="center">
          Extract essentials from advertisements
        </MDTypography>

        <MDTypography mb={5} color="text" variant="h4" textAlign="center" fontWeight="regular">
          We extract and categorize information from your advertisements for your ease.
        </MDTypography>
        <div>
          <img src={IMAGES.devices} alt="devices" />
        </div>
      </section>
    </>
  );
}

export default Access;

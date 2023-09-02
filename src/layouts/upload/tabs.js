import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";
import { useState, useEffect } from "react";
import breakpoints from "assets/theme/base/breakpoints";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// import InputURL from "../pages/inputURL";
// import Input_Image_URL from "../pages/inputIMGURL";
// import LineChartExample from "../pages/charts";
// import ImageUploader from "../pages/inputImage";

import ImageUploader from "./inputImage";
import InputURL from "./inputURL";
import PDFUploader from "./inputPDF";
export default function CenteredTabs() {
  const [value, setValue] = React.useState(0);
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <MDBox sx={{ width: "100%" }}>
      <Tabs orientation={tabsOrientation} value={value} onChange={handleChange}>
        <Tab
          label="Input URL"
          icon={
            <Icon fontSize="small" sx={{ mt: -0.25 }}>
              input
            </Icon>
          }
        />
        <Tab
          label="Upload Image"
          icon={
            <Icon fontSize="small" sx={{ mt: -0.25 }}>
              upload
            </Icon>
          }
        />
        <Tab
          label="Upload PDF"
          icon={
            <Icon fontSize="small" sx={{ mt: -0.25 }}>
              upload
            </Icon>
          }
        />
      </Tabs>

      {/* Add the content for each tab */}
      {value === 1 && (
        <MDBox p={3}>
          <MDTypography variant="h4" fontWeight="medium" mt={1} mb={5}>
            Analyze advertisement by uploaded image
          </MDTypography>
          <ImageUploader />
        </MDBox>
      )}
      {value === 0 && (
        <MDBox p={3}>
          <MDTypography variant="h4" fontWeight="medium" mt={1} mb={5}>
            Analyze Advertisements by URL
          </MDTypography>
          <InputURL />
        </MDBox>
      )}

      {value === 2 && (
        <MDBox p={3}>
          <MDTypography variant="h4" fontWeight="medium" mt={1} mb={5}>
            Analyze Advertisements by PDF
          </MDTypography>
          <PDFUploader />
        </MDBox>
      )}
    </MDBox>
  );
}

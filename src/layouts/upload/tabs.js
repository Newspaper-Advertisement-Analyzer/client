import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";
import { useState, useEffect } from "react";
import breakpoints from "assets/theme/base/breakpoints";
// import InputURL from "../pages/inputURL";
// import Input_Image_URL from "../pages/inputIMGURL";
// import LineChartExample from "../pages/charts";
// import ImageUploader from "../pages/inputImage";

import ImageUploader from "./inputImage";
import InputURL from "./inputURL";

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
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
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
          label="Input Image URL"
          icon={
            <Icon fontSize="small" sx={{ mt: -0.25 }}>
              image
            </Icon>
          }
        />
      </Tabs>

      {/* Add the content for each tab */}
      {value === 1 && (
        <Box p={3}>
          <h2>Analyze advertisement by uploaded image</h2>
          <ImageUploader />
        </Box>
      )}
      {value === 0 && (
        <Box p={3}>
          <h2>Analyze advertisement by URL</h2>
          <InputURL />
        </Box>
      )}
    </Box>
  );
}

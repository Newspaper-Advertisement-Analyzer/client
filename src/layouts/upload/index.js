import React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import CenteredTabs from "./tabs";

function Upload() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div>
        {/* <Urlanalyzer />
        <ImageUploader /> */}
        <CenteredTabs />
      </div>
    </DashboardLayout>
  );
}

export default Upload;

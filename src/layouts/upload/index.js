import React from "react";
import Urlanalyzer from "./urlanalyzer";
import ImageUploader from "./pdf";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Upload() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div>
        <Urlanalyzer />
        <ImageUploader />
      </div>
    </DashboardLayout>
  );
}

export default Upload;

// src/layouts/advertisement_map/index.js
import React from "react";
import MapComponent from "./map";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Upload() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div>
        <MapComponent />
      </div>
    </DashboardLayout>
  );
}

export default Upload;

import React from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Footer from "examples/Footer";

import GraphDetails from "./graphdetails";

function GraphReport() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <GraphDetails />
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default GraphReport;

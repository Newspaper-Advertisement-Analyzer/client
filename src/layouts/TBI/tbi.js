import { Typography } from "@mui/material";
import Loading from "components/Loading";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";

export default function TBH() {
  return (
    <div>
      <DashboardLayout>
        <DashboardNavbar />
        <Typography mt={10} mb={10} variant="h2" textAlign="center">
          Still in progress of Implementation
          <Loading type="cubes" />
        </Typography>
        <Footer />
      </DashboardLayout>
    </div>
  );
}

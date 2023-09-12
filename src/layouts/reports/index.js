import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import Footer from "examples/Footer";
import data from "./data/reportsdata";
// import MDButton from "components/MDButton";
// import { generateExcel } from "./reports";
// import { CSVLink } from "react-csv";

function Report() {
  const { columns, rows } = data();
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Reports History
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
        {/* <MDBox mt={5} textAlign="center">
          <MDButton color="primary" onClick={() => generateExcel(rawData, "uselessReport")}>
            Export to Excel
          </MDButton>
        </MDBox>
        <MDBox mt={5} textAlign="center">
          <CSVLink data={rawData} filename={`uselessCSV.csv`}>
            <MDButton color="primary">Export to CSV</MDButton>
          </CSVLink>
        </MDBox> */}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Report;

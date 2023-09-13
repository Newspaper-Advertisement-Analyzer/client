import React from "react";
import { useParams } from "react-router-dom"; // For accessing route parameters
import { Container, Typography } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

import data from "../data/reportsdata";
import MDButton from "components/MDButton";
import { generateExcel } from "../reports";
import { CSVLink } from "react-csv";
import Projects from "layouts/dashboard/components/Projects";

const GraphDetails = () => {
  const { rawData } = data();
  // Get the advertisement id from the URL
  const { title } = useParams();

  // Include id in the dependency array to refetch when id changes

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Projects />
      <MDBox mt={5} textAlign="center">
        <MDButton color="primary" onClick={() => generateExcel(rawData, "uselessReport")}>
          Export to Excel
        </MDButton>
      </MDBox>
      <MDBox mt={5} textAlign="center">
        <CSVLink data={rawData} filename={`uselessCSV.csv`}>
          <MDButton color="primary">Export to CSV</MDButton>
        </CSVLink>
      </MDBox>
    </Container>
  );
};

export default GraphDetails;

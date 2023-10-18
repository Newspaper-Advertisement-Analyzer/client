import React, { useState } from "react";
import { useParams } from "react-router-dom"; // For accessing route parameters
import { Container, Typography } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

import MDButton from "components/MDButton";
import { generateCSV, generateExcel } from "../reports";
import { CSVLink } from "react-csv";
// import Projects from "layouts/dashboard/components/Projects";
import DataTable from "examples/Tables/DataTable";
import data1 from "layouts/dashboard/components/Projects/data";
import { useEffect } from "react";
import { useUser } from "utils/userContext";

const GraphDetails = () => {
  const { user } = useUser();
  const { landSale, houseSale, marriageProposals } = data1();
  const dataMapping = {
    "Land Sales": landSale,
    "House Sales": houseSale,
    "Marriage Proposals": marriageProposals,
  };
  const [isValidTitle, setIsValidTitle] = useState(false);
  // Get the advertisement id from the URL
  const { title } = useParams();
  useEffect(() => {
    if (title in dataMapping) {
      setIsValidTitle(true);
    }
  }, [title]);
  const selectedData = dataMapping[title];
  // Include id in the dependency array to refetch when id changes

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      {isValidTitle && (
        <MDBox>
          <DataTable
            table={{ columns: selectedData.columns, rows: selectedData.rows }}
            showTotalEntries={true}
            noEndBorder
            entriesPerPage={false}
            canSearch={true}
          />
        </MDBox>
      )}
      {isValidTitle && (
        <>
          <MDBox mt={5} textAlign="center">
            <MDButton
              color="primary"
              onClick={() => generateExcel(selectedData.rows, "uselessReport", user.user_ID)}
            >
              Export to Excel
            </MDButton>
          </MDBox>
          <MDBox mt={5} textAlign="center">
            <CSVLink data={selectedData.rows} filename={`uselessCSV.csv`}>
              <MDButton
                color="primary"
                onClick={() => generateCSV(selectedData.rows, "uselessReport", user.user_ID)}
              >
                Export to CSV
              </MDButton>
            </CSVLink>
          </MDBox>
        </>
      )}
    </Container>
  );
};

export default GraphDetails;

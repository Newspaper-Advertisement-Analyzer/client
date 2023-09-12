// import React, { useState } from "react";
// import { getReportPdf } from "api/report/getReports"; // Import the getReportPdf function
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";

// // Define a component that allows you to enter a report ID and view the report
// function ReportViewer() {
//   const [reportId, setReportId] = useState("");
//   const [viewReportError, setViewReportError] = useState(null);

//   const handleViewReport = async () => {
//     try {
//       if (reportId) {
//         // Call the getReportPdf function to fetch and display the report
//         await getReportPdf(reportId);
//         setViewReportError(null);
//       } else {
//         setViewReportError("Please enter a valid report ID.");
//       }
//     } catch (error) {
//       console.error("Error viewing report:", error);
//       setViewReportError("An error occurred while viewing the report.");
//     }
//   };

//   return (
//     <div>
//       <DashboardLayout>
//         <DashboardNavbar/>
//       <h2>View Report by ID</h2>
//       <div>
//         <label htmlFor="reportId">Report ID:</label>
//         <input
//           type="text"
//           id="reportId"
//           value={reportId}
//           onChange={(e) => setReportId(e.target.value)}
//         />
//         <button onClick={handleViewReport}>View Report</button>
//       </div>
//       {viewReportError && <p>{viewReportError}</p>}
//       <Footer/>
//       </DashboardLayout>
//     </div>
//   );
// }

// export default ReportViewer;
import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DataTable from "examples/Tables/DataTable";

import data from "./data/reportsdata";
// import MDButton from "components/MDButton";
// import { generateExcel } from "./reports";
// import { CSVLink } from "react-csv";

function ReportView() {
  const { columns, rows } = data();
  return (
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
    </MDBox>
  );
}

export default ReportView;

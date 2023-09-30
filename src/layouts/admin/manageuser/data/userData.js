/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
 * =========================================================
 * Material Dashboard 2 React - v2.2.0
 * =========================================================
 *
 * Product Page: https://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2023 Creative Tim (https://www.creative-tim.com)
 *
 * Coded by www.creative-tim.com
 *
 * =========================================================
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import { useEffect, useState } from "react";
import { getReportList } from "api/report/reportsdata";

export default function Data() {
  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  const [reportDetails, setReportsDetails] = useState([]);

  useEffect(() => {
    // Fetch average price data from the Flask API endpoint
    getReportList()
      .then((data) => {
        setReportsDetails(data);
        console.log(data); // Use 'data' instead of 'reportDetails'
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDownload = (pdf_Url) => {
    if (pdf_Url) {
      // Create an anchor element to trigger the download
      const anchor = document.createElement("a");
      anchor.href = pdf_Url;
      anchor.target = "_blank"; // Open the link in a new tab
      anchor.download = "your_file_name.ext"; // Replace with the desired file name

      // Trigger the download
      anchor.click();
    } else {
      console.error("Download URL is not available.");
    }
  };

  return {
    columns: [
      { Header: "User", accessor: "author", align: "left" },
      { Header: "Profession", accessor: "function", align: "left" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "Last Seen", accessor: "employed", align: "center" },
      { Header: "Manage", accessor: "action", align: "center" },
    ],
    rows: reportDetails.map((report) => ({
      author: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {report.Title}
        </MDTypography>
      ),
      function: <Job title={report.UserID} description="Organization" />,
      status: (
        <MDBox ml={-1}>
          <MDBadge badgeContent="pdf" color="error" variant="gradient" size="sm" />
        </MDBox>
      ),
      employed: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {report.timestamp}
        </MDTypography>
      ),
      action: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
          onClick={() => handleDownload(report.PDF_URL)} // Use an arrow function
        >
          Download
        </MDTypography>
      ),
    })),
  };
}

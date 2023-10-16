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
import { useUser } from "utils/userContext";

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
  const { user } = useUser();
  const userID = user.user_ID;

  useEffect(() => {
    // Fetch average price data from the Flask API endpoint
    getReportList(userID)
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
    rawData: [
      {
        id: 1,
        name: "Historic Estate",
        location: "Jaffna",
        date: "Sun, 03 Sep 2023 18:30:04 GMT",
        contactNumbers: ["0774698456", "0768596489"],
        price: "Rs.250000",
      },
      {
        id: 2,
        name: "Seaview Bungalow",
        location: "Trincomalee",
        date: "Wed, 30 Aug 2023 18:30:07 GMT",
        contactNumbers: ["0774698459", "0768596492"],
        price: "Rs.190000",
      },
      {
        id: 3,
        name: "Ancient Property",
        location: "Anuradhapura",
        date: "Wed, 30 Aug 2023 18:30:05 GMT",
        contactNumbers: ["0774698457", "0768596490"],
        price: "Rs.120000",
      },
      {
        id: 4,
        name: "Mountain View Property",
        location: "Kandy",
        date: "Wed, 30 Aug 2023 18:30:01 GMT",
        contactNumbers: ["0774698453", "0768596486"],
        price: "Rs.150000",
      },
      {
        id: 5,
        name: "Hillside Property",
        location: "Nuwara Eliya",
        date: "Thu, 24 Aug 2023 18:30:09 GMT",
        contactNumbers: ["0774698461", "0768596494"],
        price: "Rs.120000",
      },
      {
        id: 6,
        name: "Seaside Paradise",
        location: "Galle",
        date: "Sat, 19 Aug 2023 18:30:02 GMT",
        contactNumbers: ["0774698454", "0768596487"],
        price: "Rs.200000",
      },
      {
        id: 7,
        name: "Beachfront Villa",
        location: "Negombo",
        date: "Thu, 10 Aug 2023 18:30:03 GMT",
        contactNumbers: ["0774698455", "0768596488"],
        price: "Rs.180000",
      },
      {
        id: 8,
        name: "Riverside Land",
        location: "Matara",
        date: "Fri, 04 Aug 2023 18:30:08 GMT",
        contactNumbers: ["0774698460", "0768596493"],
        price: "Rs.80000",
      },
      {
        id: 9,
        name: "Lakefront Retreat",
        location: "Batticaloa",
        date: "Thu, 03 Aug 2023 18:30:06 GMT",
        contactNumbers: ["0774698458", "0768596491"],
        price: "Rs.150000",
      },
      {
        id: 10,
        name: "Prime Lands",
        location: "Colombo",
        date: "Sun, 30 Jul 2023 18:30:00 GMT",
        contactNumbers: ["0774698452", "0768596485"],
        price: "Rs.100000",
      },
    ],
    columns: [
      { Header: "Title", accessor: "author", align: "left" },
      { Header: "Type", accessor: "function", align: "left" },
      { Header: "Format", accessor: "status", align: "center" },
      { Header: "Date", accessor: "employed", align: "center" },
      { Header: "Download", accessor: "action", align: "center" },
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

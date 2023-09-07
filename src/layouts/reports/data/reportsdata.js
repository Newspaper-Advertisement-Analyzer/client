/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

export default function data() {
  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  return {
    rawData: [
      {
        Name: "John Doe",
        Age: 30,
        Email: "johndoe@example.com",
        City: "New York",
      },
      {
        Name: "Jane Smith",
        Age: 28,
        Email: "janesmith@example.com",
        City: "Los Angeles",
      },
      {
        Name: "Bob Johnson",
        Age: 35,
        Email: "bobjohnson@example.com",
        City: "Chicago",
      },
      {
        Name: "Alice Brown",
        Age: 25,
        Email: "alicebrown@example.com",
        City: "San Francisco",
      },
      {
        Name: "What",
        Age: "am",
        Email: "I",
        City: "doing?",
      },
    ],
    columns: [
      { Header: "Title", accessor: "author", align: "left" },
      { Header: "Type", accessor: "function", align: "left" },
      { Header: "Format", accessor: "status", align: "center" },
      { Header: "Date", accessor: "employed", align: "center" },
      { Header: "Download", accessor: "action", align: "center" },
    ],

    rows: [
      {
        author: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            DemographicAnalysis
          </MDTypography>
        ),
        function: <Job title="Manager" description="Organization" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="pdf" color="error" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            23/04/18
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Download
          </MDTypography>
        ),
      },
      {
        author: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            MyReport
          </MDTypography>
        ),
        function: <Job title="Programator" description="Developer" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="csv" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            11/01/19
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Download
          </MDTypography>
        ),
      },
      {
        author: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Test
          </MDTypography>
        ),
        function: <Job title="Executive" description="Projects" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="excel" color="warning" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            19/09/17
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Download
          </MDTypography>
        ),
      },
      {
        author: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            WTH
          </MDTypography>
        ),
        function: <Job title="Programator" description="Developer" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="csv" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            24/12/08
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Download
          </MDTypography>
        ),
      },
      {
        author: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            WHOAMI
          </MDTypography>
        ),
        function: <Job title="Manager" description="Executive" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="txt" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            04/10/21
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Download
          </MDTypography>
        ),
      },
      {
        author: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Helloworld
          </MDTypography>
        ),
        function: <Job title="Programator" description="Developer" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="pdf" color="error" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            14/09/20
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Download
          </MDTypography>
        ),
      },
    ],
  };
}

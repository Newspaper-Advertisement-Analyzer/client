import React from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import { useState, useEffect } from "react";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import PieChart from "examples/Charts/PieChart";
import HorizontalBarChart from "examples/Charts/BarCharts/HorizontalBarChart";
import DefaultDoughnutChart from "examples/Charts/DoughnutCharts/DefaultDoughnutChart";

import { getAverageLandPrice } from "api/graphViewer/landsaleAveragePrice";
import { getAdDistribution } from "api/graphViewer/adDistribution";
import { getAgeDistribution } from "api/graphViewer/catergorizebyAge";

function GraphViewer() {
  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);
  const [averageLandPrice, setAverageLandPrice] = useState([]);
  const [adDistribution, setadDistribution] = useState([]);
  const [ageDistribution, setageDistribution] = useState([]);

  useEffect(() => {
    // Fetch average price data from the Flask API endpoint
    getAverageLandPrice()
      .then((data) => {
        setAverageLandPrice(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch average price data from the Flask API endpoint
    getAdDistribution()
      .then((data) => {
        setadDistribution(data);
        //console.log(adDistribution);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch average price data from the Flask API endpoint
    getAgeDistribution()
      .then((data) => {
        setageDistribution(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Action</MenuItem>
      <MenuItem onClick={closeMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMenu}>Something else</MenuItem>
    </Menu>
  );
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Projects
          </MDTypography>
          <MDBox display="flex" alignItems="center" lineHeight={0}>
            <Icon
              sx={{
                fontWeight: "bold",
                color: ({ palette: { info } }) => info.main,
                mt: -0.5,
              }}
            >
              done
            </Icon>
            <MDTypography variant="button" fontWeight="regular" color="text">
              &nbsp;<strong>30 done</strong> this month
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            more_vert
          </Icon>
        </MDBox>
        {renderMenu}
      </MDBox>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={6}>
          <MDBox mt={4}>
            <VerticalBarChart
              icon={{ color: "info", component: "leaderboard" }}
              title="Land Sales"
              description="Weekly Reach"
              chart={{
                labels: averageLandPrice.map((data) => data._id), // Use the data from the API
                datasets: [
                  {
                    label: "Price Per Perch by Week",
                    color: "primary",
                    data: averageLandPrice.map((data) => data.average_price), // Use the data from the API
                  },
                ],
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <MDBox mt={4}>
            <HorizontalBarChart
              icon={{ color: "info", component: "leaderboard" }}
              title="Distribution by Category"
              description="Overall category distribution in the database"
              chart={{
                labels: adDistribution.map((data) => data.label),
                datasets: [
                  {
                    label: "Distribution Count",
                    color: "primary",
                    data: adDistribution.map((data) => data.count), // Use the data from the API
                  },
                ],
              }}
            />
          </MDBox>
        </Grid>
      </Grid>
      <MDBox mt={4}>
        <PieChart
          icon={{ color: "info", component: "leaderboard" }}
          title="Distribution Marriage Proposal"
          description=" According to Age"
          chart={{
            labels: ageDistribution.map((data) => data._id),
            datasets: {
              label: "Age Group",
              backgroundColors: ["info", "primary", "dark", "secondary", "primary"],
              data: ageDistribution.map((data) => data.count),
            },
          }}
        />
      </MDBox>

      <MDBox mt={4}>
        <DefaultDoughnutChart
          icon={{ color: "info", component: "leaderboard" }}
          title="Default Doughnut Chart"
          description="Affiliates program"
          chart={{
            labels: ["Creative Tim", "Github", "Bootsnipp", "Dev.to", "Codeinwp"],
            datasets: {
              label: "Projects",
              backgroundColors: ["info", "dark", "error", "secondary", "primary"],
              data: [15, 20, 12, 60, 20],
            },
          }}
        />
      </MDBox>
    </DashboardLayout>
  );
}

export default GraphViewer;

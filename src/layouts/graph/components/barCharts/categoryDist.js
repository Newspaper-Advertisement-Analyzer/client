import React from "react";
import MDBox from "components/MDBox";

import { useState, useEffect } from "react";

import HorizontalBarChart from "examples/Charts/BarCharts/HorizontalBarChart";

import { getAdDistribution } from "api/graphViewer/adDistribution";

function CategoryDistribution() {
  const [adDistribution, setadDistribution] = useState([]);

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

  return (
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
        action={{
          type: "internal", // or "external" based on your use case
          route: "/reports/Category Distribution", // Define the route
        }}
      />
    </MDBox>
  );
}

export default CategoryDistribution;

import React from "react";
import MDBox from "components/MDBox";

import { useState, useEffect } from "react";

import PieChart from "examples/Charts/PieChart";

import { getAgeDistribution } from "api/graphViewer/catergorizebyAge";

function MarriageDistribution() {
  const [ageDistribution, setageDistribution] = useState([]);

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

  return (
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
  );
}

export default MarriageDistribution;
import React from "react";
import MDBox from "components/MDBox";

import { useState, useEffect } from "react";

import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";

import { getAverageLandPrice } from "api/graphViewer/landsaleAveragePrice";

function LandsaleAveragePrice() {
  const [averageLandPrice, setAverageLandPrice] = useState([]);

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

  return (
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
  );
}

export default LandsaleAveragePrice;

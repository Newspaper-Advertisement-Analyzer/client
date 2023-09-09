import React from "react";
import MDBox from "components/MDBox";

import { useState, useEffect } from "react";

import DefaultDoughnutChart from "examples/Charts/DoughnutCharts/DefaultDoughnutChart";

import { getHouseSalebyCity } from "api/graphViewer/houseSalebyCity";

function HouseSaleDistribution() {
  const [housesalebyCity, sethousesalebyCity] = useState([]);

  useEffect(() => {
    // Fetch average price data from the Flask API endpoint
    getHouseSalebyCity()
      .then((data) => {
        sethousesalebyCity(data);
        console.log(housesalebyCity);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <MDBox mt={4}>
      <DefaultDoughnutChart
        icon={{ color: "info", component: "leaderboard" }}
        title="Distribution of House Sales"
        description="According to City"
        chart={{
          labels: housesalebyCity.map((data) => data._id),
          datasets: {
            label: "City",
            backgroundColors: ["info", "dark", "error", "secondary", "primary", "success"],
            data: housesalebyCity.map((data) => data.count),
          },
        }}
        action={{
          type: "internal", // or "external" based on your use case
          route: "/reports/Distribution of House Sales", // Define the route
          color: "primary",
          label: "View Details",
        }}
      />
    </MDBox>
  );
}

export default HouseSaleDistribution;

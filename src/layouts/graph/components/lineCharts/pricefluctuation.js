// Material Dashboard 2 React Examples
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import React from "react";
import MDBox from "components/MDBox";

import { useState, useEffect } from "react";

// import {getPriceFluct} from "api/graphViewer/fluctuationPrice";

function PriceFluctuation() {
  const [PriceFluctuation, setPriceFluctuation] = useState([]);

  useEffect(() => {
    // Fetch average price data from the Flask API endpoint'
    const fetchData = async () => {
      try {
        var data;
        // const data = getPriceFluct();
        setPriceFluctuation(data);
        console.log(PriceFluctuation);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function whenever selectedItem changes
    fetchData();
  }, []);

  return (
    <MDBox mt={4}>
      <DefaultLineChart
        icon={{ color: "info", component: "leaderboard" }}
        title="Price Fluctuation"
        description="Estimation for future years"
        chart={{
          labels: ["2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028"],
          datasets: [
            {
              label: "Land Price",
              color: "primary",
              data: [
                5000000, 4000000, 3000000, 2200000, 5000000, 2500000, 4000000, 2300000, 5000000,
              ],
              tension: 0.5,
            },
            {
              label: "House Price",
              color: "dark",
              data: [3000000, 900000, 400000, 1400000, 2900000, 2900000, 3400000, 2300000, 4000000],
              tension: 0.5,
            },
          ],
        }}
      />
    </MDBox>
  );
}

export default PriceFluctuation;

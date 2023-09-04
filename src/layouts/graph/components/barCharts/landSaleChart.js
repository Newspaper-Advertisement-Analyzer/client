import React from "react";
import MDBox from "components/MDBox";

import { useState, useEffect } from "react";

import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";

import { getAverageLandPrice } from "api/graphViewer/landsaleAveragePrice";

function LandsaleAveragePrice() {
  const [averageLandPrice, setAverageLandPrice] = useState([]);
  const [selectedItem, setSelectedItem] = useState("Weekly");

  const handleMenuItemSelect = async (item) => {
    setSelectedItem(item);
  };

  console.log(selectedItem);
  useEffect(() => {
    // Fetch average price data from the Flask API endpoint'
    const fetchData = async () => {
      try {
        let data;

        if (selectedItem === "Weekly") {
          data = await getAverageLandPrice("Weekly");
        } else if (selectedItem === "Monthly") {
          data = await getAverageLandPrice("Monthly");
        } else if (selectedItem === "Yearly") {
          data = await getAverageLandPrice("Yearly");
        }

        setAverageLandPrice(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function whenever selectedItem changes
    fetchData();
  }, [selectedItem]);

  return (
    <MDBox mt={4}>
      <VerticalBarChart
        icon={{ color: "info", component: "leaderboard" }}
        title="Land Sales"
        description={`Average Price Per Perch - ${selectedItem}`}
        chart={{
          labels: averageLandPrice.map((data) => data._id), // Use the data from the API
          datasets: [
            {
              label: `Price Per Perch by ${selectedItem}`,
              color: "primary",
              data: averageLandPrice.map((data) => data.average_price), // Use the data from the API
            },
          ],
        }}
        menuItems={["Weekly", "Monthly", "Yearly"]}
        onMenuItemSelect={handleMenuItemSelect}
      />
    </MDBox>
  );
}

export default LandsaleAveragePrice;
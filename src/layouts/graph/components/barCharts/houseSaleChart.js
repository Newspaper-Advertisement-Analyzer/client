import React from "react";
import MDBox from "components/MDBox";

import { useState, useEffect } from "react";

import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";

// import { getAverageLandPrice } from "api/graphViewer/landsaleAveragePrice";
// import { getAverageHousePrice } from "api/graphViewer/houseSaleAveragePrice";

function HousesaleAveragePrice() {
  const [averageHousePrice, setAverageHousePrice] = useState([]);
  const [selectedItem, setSelectedItem] = useState("Weekly");

  const handleMenuItemSelect = (item) => {
    setSelectedItem(item);
    // You can perform any additional actions here based on the selected item
  };
  console.log(selectedItem);
  useEffect(() => {
    // Fetch average price data from the Flask API endpoint'
    const fetchData = async () => {
      try {
        let data;

        if (selectedItem === "Weekly") {
          data = await getAverageHousePrice("weekly");
        } else if (selectedItem === "Monthly") {
          data = await getAverageHousePrice("monthly");
        } else if (selectedItem === "Yearly") {
          data = await getAverageHousePrice("yearly");
        }

        setAverageHousePrice(data);
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
        title="House Sales"
        description={`Average Price - ${selectedItem}`}
        chart={{
          labels: averageHousePrice.map((data) => data._id), // Use the data from the API
          datasets: [
            {
              label: `Price by ${selectedItem}`,
              color: "primary",
              data: averageHousePrice.map((data) => data.average_price), // Use the data from the API
            },
          ],
        }}
        menuItems={["Weekly", "Monthly", "Yearly"]}
        onMenuItemSelect={handleMenuItemSelect}
      />
    </MDBox>
  );
}

export default HousesaleAveragePrice;

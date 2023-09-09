import React from "react";
import MDBox from "components/MDBox";

import { useState, useEffect } from "react";

import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";

import { getAverageHousePrice } from "api/graphViewer/houseSaleAveragePrice";

function HousesaleAveragePrice() {
  const [averageHousePrice, setAverageHousePrice] = useState([]);
  const [selectedItem, setSelectedItem] = useState("Weekly");
  const [selectedDistrict, setSelectedDistrict] = useState("Overall");

  const handleMenuItemSelect = (item) => {
    setSelectedItem(item);
    // You can perform any additional actions here based on the selected item
  };
  const handleDistrictSelect = async (item) => {
    setSelectedDistrict(item);
  };
  console.log(selectedItem);
  console.log(selectedDistrict);
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
        districts={[
          "Overall",
          "Colombo",
          "Gampaha",
          "Kalutara",
          "Kandy",
          "Matale",
          "Nuwara Eliya",
          "Galle",
          "Matara",
          "Hambantota",
          "Jaffna",
          "Kilinochchi",
          "Mannar",
          "Mullaitivu",
          "Vavuniya",
          "Puttalam",
          "Kurunegala",
          "Anuradhapura",
          "Polonnaruwa",
          "Badulla",
          "Monaragala",
          "Ratnapura",
          "Kegalle",
        ]}
        onDistrictSelect={handleDistrictSelect}
        action={{
          type: "internal", // or "external" based on your use case
          route: "/reports/House Sales", // Define the route
          color: "primary",
          label: "View Details",
        }}
      />
    </MDBox>
  );
}

export default HousesaleAveragePrice;

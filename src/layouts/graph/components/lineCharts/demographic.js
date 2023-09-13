// Material Dashboard 2 React Examples
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import React from "react";
import MDBox from "components/MDBox";

import { useState, useEffect } from "react";

// import {getDemographic} from "api/graphViewer/demographic";

function Demographic() {
  const [demographic, setdemographic] = useState([]);
  const [selectedItem, setSelectedItem] = useState("Population Density");

  const handleMenuItemSelect = async (item) => {
    setSelectedItem(item);
  };
  console.log(selectedItem);
  useEffect(() => {
    const fetchData = async () => {
      try {
        var data;
        // const data = getDemographic();
        setdemographic(data);
        console.log(demographic);
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
        icon={{ color: "info", component: "people" }}
        title="Demographic Analysis"
        description={`Subject to ${selectedItem}`}
        menuItems={[
          "Population Density",
          "Per capita Income",
          "Infrastructure level",
          "Education Level",
        ]}
        onMenuItemSelect={handleMenuItemSelect}
        chart={{
          labels: ["50", "100", "150", "200", "250", "300", "350", "400", "450"],
          datasets: [
            {
              label: "Land Price",
              color: "primary",
              data: [
                1000000, 1500000, 2500000, 4000000, 5000000, 8000000, 12000000, 16000000, 25000000,
              ],
              tension: 0.5,
            },
            {
              label: "House Price",
              color: "dark",
              data: [
                3000000, 4500000, 400000, 1400000, 2900000, 2900000, 3400000, 2300000, 6000000,
              ],
              tension: 0.5,
            },
          ],
        }}
        action={{
          type: "internal", // or "external" based on your use case
          route: "/reports/Demographic Analysis", // Define the route
          color: "primary",
          label: "View Details",
        }}
      />
    </MDBox>
  );
}

export default Demographic;

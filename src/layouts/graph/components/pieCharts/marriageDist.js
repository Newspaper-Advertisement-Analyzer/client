import React from "react";
import MDBox from "components/MDBox";

import { useState, useEffect } from "react";

import PieChart from "examples/Charts/PieChart";

import { getAgeDistribution } from "api/graphViewer/catergorizeProposals";

function MarriageDistribution() {
  const [ageDistribution, setageDistribution] = useState([]);
  const [selectedItem, setSelectedItem] = useState("Age");
  const handleMenuItemSelect = async (item) => {
    setSelectedItem(item);
  };
  console.log(selectedItem);
  useEffect(() => {
    // Fetch average price data from the Flask API endpoint
    getAgeDistribution(selectedItem)
      .then((data) => {
        setageDistribution(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [selectedItem]);

  return (
    <MDBox mt={4}>
      <PieChart
        icon={{ color: "info", component: "people" }}
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
        menuItems={["Age", "Profession", "District"]}
        onMenuItemSelect={handleMenuItemSelect}
        action={{
          type: "internal", // or "external" based on your use case
          route: "/reports/Distribution of Marriage Proposal", // Define the route
          color: "primary",
          label: "View Details",
        }}
      />
    </MDBox>
  );
}

export default MarriageDistribution;

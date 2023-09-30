import React from "react";
import { Card } from "@mui/material";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function ManageFeedback() {
  // Assuming feedbackData is an array of feedback objects
  const feedbackData = [
    {
      name: "John Doe",
      email: "johndoe@example.com",
      date: "2023-09-01",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget justo eu urna condimentum elementum vel eget enim.",
    },
    {
      name: "Jane Smith",
      email: "janesmith@example.com",
      date: "2023-09-02",
      message:
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas quis fringilla libero.",
    },
    {
      name: "Alice Johnson",
      email: "alicejohnson@example.com",
      date: "2023-09-03",
      message:
        "Vestibulum in metus eu ipsum finibus auctor. Curabitur feugiat urna eget elit dictum, eget elementum quam cursus.",
    },
    // Add more feedback objects as needed
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <h2>Manage Feedback</h2>
      {feedbackData.map((feedback, index) => (
        <Card key={index} elevation={3} style={{ marginBottom: "16px" }}>
          <div style={{ padding: "16px" }}>
            <MDTypography variant="h6" fontWeight="bold">
              {feedback.name}
            </MDTypography>
            <MDTypography variant="body2" color="textSecondary">
              {feedback.email} | {feedback.date}
            </MDTypography>
            <MDTypography variant="body1" mt={2}>
              {feedback.message}
            </MDTypography>
            {/* You can add buttons or actions here for managing feedback */}
          </div>
        </Card>
      ))}
    </DashboardLayout>
  );
}

export default ManageFeedback;

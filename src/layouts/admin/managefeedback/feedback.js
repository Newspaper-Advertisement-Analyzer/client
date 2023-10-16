import React, { useState, useEffect } from "react";
import { Card } from "@mui/material";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { getFeedbackData } from "api/feedback/getFeedback";

// Helper function to render the rating as stars
const renderRatingStars = (rating) => {
  const starArray = [];
  for (let i = 0; i < rating; i++) {
    starArray.push(<span key={i}>&#9733;</span>); // Render a star character
  }
  return starArray;
};

function ManageFeedback() {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    // Fetch feedback data when the component mounts
    async function fetchFeedbackData() {
      try {
        const data = await getFeedbackData();
        setFeedbackData(data);
      } catch (error) {
        console.error("Error fetching feedback data:", error);
      }
    }
    fetchFeedbackData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <h2>Manage Feedback</h2>
      {feedbackData.map((feedback, index) => (
        <Card key={index} elevation={3} style={{ marginBottom: "16px" }}>
          <div style={{ padding: "16px" }}>
            <MDTypography variant="h6" fontWeight="bold">
              {feedback.user_name}
            </MDTypography>
            <MDTypography variant="h6" fontWeight="bold">
              {feedback.email}
            </MDTypography>
            <MDTypography variant="body2" color="textSecondary">
              {feedback.rating && renderRatingStars(feedback.rating)} |{" "}
              {feedback.date && new Date(feedback.date).toDateString()}
            </MDTypography>
            <MDTypography variant="body1" mt={2}>
              {feedback.feedback}
            </MDTypography>
            <MDTypography variant="body1" mt={2}>
              {feedback.timestamp && new Date(feedback.timestamp).toLocaleString()}
            </MDTypography>
            {/* You can add buttons or actions here for managing feedback */}
          </div>
        </Card>
      ))}
    </DashboardLayout>
  );
}

export default ManageFeedback;

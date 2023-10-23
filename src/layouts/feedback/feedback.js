// FeedbackSection.jsx
import { Card, Checkbox, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import React, { useState, useEffect } from "react";
import { submitFeedback } from "api/feedback/saveFeedback";
import { useUser } from "utils/userContext";
import { getFeedbackData } from "api/feedback/getFeedback";
import Loading from "components/Loading";

// Helper function to render the rating as stars
const renderRatingStars = (rating) => {
  const starArray = [];
  for (let i = 0; i < rating; i++) {
    starArray.push(<span key={i}>&#9733;</span>); // Render a star character
  }
  return starArray;
};

const FeedbackSection = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const userID = user.user_ID;

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handlePublishChange = (e) => {
    setPublish(e.target.checked);
  };

  const handleSubmitFeedback = async () => {
    try {
      await submitFeedback({ rating, feedback, publish, userID }); // Using the submitFeedback function from the API
      setRating(0);
      setFeedback("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    // Fetch feedback data when the component mounts
    async function fetchFeedbackData() {
      try {
        setLoading(true);
        const data = await getFeedbackData();
        setFeedbackData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching feedback data:", error);
      }
    }
    fetchFeedbackData();
  }, []);

  return (
    <div>
      <Card style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <MDBox p={3}>
          <div>
            <MDTypography variant="h4" gutterBottom alignItems="center" textAlign="center">
              Rate our Newspaper Advertisement Analyzer
            </MDTypography>
            <MDBox style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleRatingChange(star)}
                  style={{
                    cursor: "pointer",
                    color: star <= rating ? "orange" : "gray",
                    fontSize: "50px",
                  }}
                >
                  &#9733;
                </span>
              ))}
            </MDBox>
          </div>
          <div>
            <MDTypography>Your Comment is extremely valuable to us</MDTypography>
            <TextField
              value={feedback}
              onChange={handleFeedbackChange}
              id="outlined-multiline-static"
              multiline
              rows={4}
              cols={100}
              placeholder="Your comments..."
              fullWidth
            />
          </div>
          <div>
            <Checkbox
              id="publish"
              checked={publish}
              onChange={handlePublishChange}
              inputProps={{ "aria-label": "controlled" }}
            />
            <label style={{ fontSize: "15px" }} htmlFor="publish">
              We value your privacy. Check the box if you like to publish your feedback
            </label>
          </div>
          <MDBox mt={2} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <MDButton onClick={handleSubmitFeedback} color="primary" mt={5}>
              Submit Feedback
            </MDButton>
          </MDBox>
        </MDBox>
      </Card>
      <MDBox mt={5}></MDBox>
      <MDBox mb={5}>{loading && <Loading />}</MDBox>
      {feedbackData.map((feedback, index) => (
        <Card key={index} elevation={3} style={{ marginBottom: "16px" }}>
          <div style={{ padding: "16px" }}>
            <MDTypography variant="h6" fontWeight="bold">
              {feedback.user_name || feedback.Full_Name || "Anonymous"}
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
              {new Date(feedback.timestamp.$date).toLocaleString() || feedback.timestamp.$date}
            </MDTypography>
            {/* You can add buttons or actions here for managing feedback */}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default FeedbackSection;

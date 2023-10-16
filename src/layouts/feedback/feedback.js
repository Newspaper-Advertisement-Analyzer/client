// FeedbackSection.jsx
import { Card, Checkbox, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import React, { useState } from "react";
import { submitFeedback } from "api/feedback/saveFeedback";
import { useUser } from "utils/userContext";

const FeedbackSection = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [publish, setPublish] = useState(false);
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

  return (
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
  );
};

export default FeedbackSection;

import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Simulated data for advertisements pending approval
const advertisements = [
  {
    id: 1,
    title: "Historic Estate",
    location: "Jaffna",
    date: "Sun, 03 Sep 2023 18:30:04 GMT",
    description: "This is a historic estate.",
    image: "image_url_here",
  },
  {
    id: 2,
    title: "Historic Estate",
    location: "Jaffna",
    date: "Sun, 03 Sep 2023 18:30:04 GMT",
    description: "This is a historic estate.",
    image: "image_url_here",
  },
  // Add more advertisements as needed
];

function ContentApprovalPage() {
  const [pendingAds, setPendingAds] = useState(advertisements);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    // Fetch pending advertisements from the server here if needed
    // Update the 'pendingAds' state with the fetched data
  }, []);

  const approveAd = () => {
    // Handle approval logic here (e.g., send a request to the server)
    // Remove the current ad from the pending list
    const updatedAds = [...pendingAds];
    updatedAds.splice(currentAdIndex, 1);
    setPendingAds(updatedAds);

    // Move to the next ad
    if (currentAdIndex < updatedAds.length) {
      setCurrentAdIndex(currentAdIndex + 1);
    }
  };

  const rejectAd = () => {
    // Handle rejection logic here (e.g., send a request to the server)
    // Remove the current ad from the pending list
    const updatedAds = [...pendingAds];
    updatedAds.splice(currentAdIndex, 1);
    setPendingAds(updatedAds);

    // Move to the next ad
    if (currentAdIndex < updatedAds.length) {
      setCurrentAdIndex(currentAdIndex + 1);
    }
  };

  const currentAd = pendingAds[currentAdIndex];

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Content Approval
        </Typography>
        {currentAd ? (
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Advertisement ID: {currentAd.id}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Title: {currentAd.title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Location: {currentAd.location}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Date: {currentAd.date}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Description: {currentAd.description}
              </Typography>
              {currentAd.image && (
                <img
                  src={currentAd.image}
                  alt="Advertisement"
                  style={{ maxWidth: "100%", marginTop: "16px" }}
                />
              )}
              <Box mt={2} display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={approveAd}
                  style={{ marginRight: "16px" }}
                >
                  Approve
                </Button>
                <Button variant="contained" color="secondary" onClick={rejectAd}>
                  Reject
                </Button>
              </Box>
            </CardContent>
          </Card>
        ) : (
          <Typography variant="h6" align="center">
            No pending advertisements.
          </Typography>
        )}
      </Container>
    </DashboardLayout>
  );
}

export default ContentApprovalPage;

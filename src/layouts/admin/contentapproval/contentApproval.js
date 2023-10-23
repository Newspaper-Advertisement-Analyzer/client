import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { fetchPendingAdvertisements } from "api/pendingAdvertisement/pendingAdvertisemnet";
import MDButton from "components/MDButton";

// Simulated data for advertisements pending approval
// const advertisements = [
//   {
//     id: 1,
//     title: "Historic Estate",
//     location: "Jaffna",
//     date: "Sun, 03 Sep 2023 18:30:04 GMT",
//     description: "This is a historic estate.",
//     image: "image_url_here",
//   },
//   {
//     id: 2,
//     title: "Historic Estate",
//     location: "Jaffna",
//     date: "Sun, 03 Sep 2023 18:30:04 GMT",
//     description: "This is a historic estate.",
//     image: "image_url_here",
//   },
//   // Add more advertisements as needed
// ];

function ContentApprovalPage() {
  const [pendingAds, setPendingAds] = useState([]);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchPendingAdvertisements();
        setPendingAds(data);
        console.log(pendingAds);
      } catch (error) {
        console.error("Error fetching pending advertisements:", error);
      }
    }
    fetchData();
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

  //const currentAd = pendingAds[currentAdIndex];

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Content Approval
        </Typography>
        {pendingAds.length ? (
          pendingAds.map((currentAd, index) => (
            <Card key={index} style={{ marginTop: "20px" }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Advertisement ID: {currentAd.Advertisement_ID}
                </Typography>
                <Typography variant="h5" gutterBottom>
                  Category: {currentAd.Category}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Title: {currentAd.Title}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Location: {currentAd.Location.City}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Date: {currentAd.Posted_Date}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Description: {currentAd.Description}
                </Typography>
                {currentAd.image && (
                  <img
                    src={currentAd.image}
                    alt="Advertisement"
                    style={{ maxWidth: "100%", marginTop: "16px" }}
                  />
                )}
                <Box mt={2} display="flex" justifyContent="center">
                  <MDButton
                    variant="contained"
                    color="primary"
                    onClick={approveAd}
                    style={{ marginRight: "16px" }}
                  >
                    Approve
                  </MDButton>
                  <MDButton
                    variant="contained"
                    color="warning"
                    onClick={rejectAd}
                    style={{ marginRight: "16px" }}
                  >
                    Edit
                  </MDButton>
                  <MDButton variant="contained" color="error" onClick={rejectAd}>
                    Reject
                  </MDButton>
                </Box>
              </CardContent>
            </Card>
          ))
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

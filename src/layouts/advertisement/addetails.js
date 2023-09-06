// src/components/AdvertisementDetail.js

import React from "react";
import { useParams } from "react-router-dom"; // For accessing route parameters
import { Container, Typography } from "@mui/material";

const Addetail = () => {
  // Get the advertisement id from the URL
  const { id } = useParams();

  // Find the advertisement with the matching id
  const advertisements = [
    { id: "ad2004", title: "test", description: "test", date: "test", city: "test", phone: "test" },
  ];
  const ad = advertisements.find((ad) => ad.id === id);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Advertisement Details
      </Typography>
      {ad ? (
        <div>
          <Typography variant="h5" component="h2" gutterBottom>
            {ad.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {ad.description}
          </Typography>
          <Typography variant="subtitle1">Date: {ad.date}</Typography>
          <Typography variant="subtitle1">City: {ad.city}</Typography>
          <Typography variant="subtitle1">Phone: {ad.phone}</Typography>
          {/* Add more details as needed */}
        </div>
      ) : (
        <Typography variant="body1">Advertisement not found.</Typography>
      )}
    </Container>
  );
};

export default Addetail;

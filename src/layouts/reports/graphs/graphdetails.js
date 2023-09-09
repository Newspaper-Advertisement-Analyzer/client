import React from "react";
import { useParams } from "react-router-dom"; // For accessing route parameters
import { Container, Typography } from "@mui/material";

const GraphDetails = () => {
  // Get the advertisement id from the URL
  const { title } = useParams();

  // Include id in the dependency array to refetch when id changes

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
    </Container>
  );
};

export default GraphDetails;

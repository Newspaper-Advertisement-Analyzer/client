import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // For accessing route parameters
import { Container, Typography } from "@mui/material";
import { getAdDetail } from "api/advertisemntCards/advertisementCard";

const Addetail = () => {
  // Get the advertisement id from the URL
  const { id } = useParams();
  const [adDetails, setADDetails] = useState();

  useEffect(() => {
    // Fetch data from the backend using the imported function
    const fetchData = async () => {
      try {
        const data = await getAdDetail(id);
        setADDetails(data);
        console.log(adDetails);
      } catch (error) {
        console.error("Error fetching data from the backend:", error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [id]); // Include id in the dependency array to refetch when id changes

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Advertisement Details
      </Typography>
      {adDetails ? (
        <div>
          <Typography variant="h5" component="h2" gutterBottom>
            {adDetails.Title}
          </Typography>
          <Typography variant="body1" paragraph>
            {adDetails.Description}
          </Typography>
          <Typography variant="subtitle1">Posted Date: {adDetails.Posted_Date}</Typography>
          <Typography variant="subtitle1">City: {adDetails.Location.City}</Typography>
          <Typography variant="subtitle1">
            Phone: {adDetails.Contact_Info.Phone_Number[0]} {adDetails.Contact_Info.Phone_Number[1]}
          </Typography>
          {/* Add more details as needed */}
        </div>
      ) : (
        <Typography variant="body1">Advertisement not found.</Typography>
      )}
    </Container>
  );
};

export default Addetail;

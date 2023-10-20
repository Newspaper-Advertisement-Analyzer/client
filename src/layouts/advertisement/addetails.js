import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // For accessing route parameters
import { Card, Container, Typography } from "@mui/material";
import { getAdDetail } from "api/advertisemntCards/advertisementCard";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";

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
        console.log(adDetails.Source);
      } catch (error) {
        console.error("Error fetching data from the backend:", error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [id]); // Include id in the dependency array to refetch when id changes

  const redirectToGoogleMaps = () => {
    const longitude = adDetails.Location.Longitude;
    const latitude = adDetails.Location.Latitude;
    const mapsURL = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(mapsURL, "_blank");
  };

  const renderAdvertisementDetails = () => {
    if (id[2] === "1") {
      // Render details for land sale category
      return (
        <div>
          <MDTypography textAlign="center" variant="h1" fontWeight="medium" color="primary">
            {adDetails.Title}
          </MDTypography>
          <MDTypography textAlign="center" variant="h3" fontWeight="regular" color="text">
            {adDetails.Description}
          </MDTypography>

          <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Card sx={{ my: { xs: 2, md: 4 }, p: { xs: 2, md: 3 } }}>
              <MDBox p={2}>
                <MDTypography variant="h4" fontWeight="medium" color="primary">
                  General Information
                </MDTypography>
                <MDBox component="ul" display="flex" flexDirection="column" p={1} m={0}>
                  <MDBox component="li" display="flex" alignItems="center" py={1} mb={1}>
                    <MDBox
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      justifyContent="center"
                    >
                      <MDTypography variant="h5" fontWeight="regular">
                        Price
                      </MDTypography>
                    </MDBox>
                    <MDBox ml="auto">
                      <MDTypography color="dark" variant="subtitle1" fontWeight="medium">
                        Rs. {adDetails.Price}
                      </MDTypography>
                    </MDBox>
                  </MDBox>

                  <MDBox component="li" display="flex" alignItems="center" py={1} mb={1}>
                    <MDBox
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      justifyContent="center"
                    >
                      <MDTypography variant="h5" fontWeight="regular">
                        Number of Rooms
                      </MDTypography>
                    </MDBox>
                    <MDBox ml="auto">
                      <MDTypography variant="subtitle1" color="dark">
                        {adDetails.Number_of_Rooms}
                      </MDTypography>
                    </MDBox>
                  </MDBox>

                  <MDBox component="li" display="flex" alignItems="center" py={1} mb={1}>
                    <MDBox
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      justifyContent="center"
                    >
                      <MDTypography variant="h5" fontWeight="regular">
                        Posted on
                      </MDTypography>
                    </MDBox>
                    <MDBox ml="auto">
                      <MDTypography variant="subtitle1" color="dark">
                        {new Date(adDetails.Posted_Date).toLocaleString()}
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                  <MDBox component="li" display="flex" alignItems="center" py={1} mb={1}>
                    <MDBox
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      justifyContent="center"
                    >
                      <MDTypography variant="h5" fontWeight="regular">
                        Source
                      </MDTypography>
                    </MDBox>
                    <MDBox ml="auto">
                      <MDTypography variant="subtitle1" color="dark">
                        {adDetails.Source}
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                </MDBox>
                <MDTypography variant="h4" fontWeight="medium" color="primary">
                  Contact Information
                </MDTypography>
                <MDBox component="ul" display="flex" flexDirection="column" p={1} m={0}>
                  <MDBox component="li" display="flex" alignItems="center" py={1} mb={1}>
                    <MDBox
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      justifyContent="center"
                    >
                      <MDTypography variant="h5" fontWeight="regular">
                        Phone Numbers
                      </MDTypography>
                    </MDBox>
                    <MDBox ml="auto">
                      {adDetails.Contact_Info.Phone_Number.map((phoneNumber, index) => (
                        <MDButton
                          key={index}
                          component="a"
                          href={`tel:${phoneNumber}`}
                          target="_blank"
                          rel="noreferrer"
                          variant="text"
                          color="primary"
                        >
                          <MDTypography variant="h6">{phoneNumber}</MDTypography>
                        </MDButton>
                      ))}
                    </MDBox>
                  </MDBox>
                  <MDBox component="li" display="flex" alignItems="center" py={1} mb={1}>
                    <MDBox
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      justifyContent="center"
                    >
                      <MDTypography variant="h5" fontWeight="regular">
                        Email
                      </MDTypography>
                    </MDBox>
                    <MDBox ml="auto">
                      <MDButton
                        component="a"
                        href={`mailto:${adDetails.Contact_Info.Email}`}
                        target="_blank"
                        rel="noreferrer"
                        variant="text"
                        color="primary"
                      >
                        <MDTypography variant="h6">{adDetails.Contact_Info.Email}</MDTypography>
                      </MDButton>
                    </MDBox>
                  </MDBox>
                </MDBox>

                <MDTypography variant="h4" fontWeight="medium" color="primary">
                  Location
                </MDTypography>
                <MDBox component="ul" display="flex" flexDirection="column" p={1} m={0}>
                  <MDBox component="li" display="flex" alignItems="center" py={1} mb={1}>
                    <MDBox
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      justifyContent="center"
                    >
                      <MDTypography variant="h5" fontWeight="regular">
                        Nearest City
                      </MDTypography>
                    </MDBox>
                    <MDBox ml="auto">
                      <MDTypography variant="h5" color="dark" fontWeight="regular">
                        {adDetails.Location.City}
                      </MDTypography>
                    </MDBox>
                  </MDBox>

                  <MDBox component="li" display="flex" alignItems="center" py={1} mb={1}>
                    <MDBox
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      justifyContent="center"
                    >
                      <MDButton color="primary" onClick={redirectToGoogleMaps}>
                        Open in Google Maps
                      </MDButton>
                    </MDBox>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </Container>
        </div>
      );
    } else if (id[2] === "2") {
      // Render details for house sale category
      return (
        <div>
          <MDTypography textAlign="center" variant="h1" fontWeight="medium" color="primary">
            {adDetails.Title}
          </MDTypography>
          <MDTypography textAlign="center" variant="h3" fontWeight="regular" color="text">
            {adDetails.Description}
          </MDTypography>

          <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Card sx={{ my: { xs: 2, md: 4 } }}>
              <MDBox p={2}>
                <MDTypography variant="h4" fontWeight="medium" color="primary">
                  General Information
                </MDTypography>
                <MDBox component="ul" display="flex" flexDirection="column" p={1} m={0}>
                  <MDBox component="li" display="flex" alignItems="center" py={1} mb={1}>
                    <MDBox
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      justifyContent="center"
                    >
                      <MDTypography variant="h5" fontWeight="regular">
                        Price per Perch
                      </MDTypography>
                    </MDBox>
                    <MDBox ml="auto">
                      <MDTypography color="dark" variant="subtitle1" fontWeight="medium">
                        Rs. {adDetails.Price_per_Perch}
                      </MDTypography>
                    </MDBox>
                  </MDBox>

                  <MDBox component="li" display="flex" alignItems="center" py={1} mb={1}>
                    <MDBox
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      justifyContent="center"
                    >
                      <MDTypography variant="h5" fontWeight="regular">
                        Number of Perches
                      </MDTypography>
                    </MDBox>
                    <MDBox ml="auto">
                      <MDTypography variant="subtitle1" color="dark">
                        {adDetails.Number_of_Perch}
                      </MDTypography>
                    </MDBox>
                  </MDBox>

                  <MDBox component="li" display="flex" alignItems="center" py={1} mb={1}>
                    <MDBox
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      justifyContent="center"
                    >
                      <MDTypography variant="h5" fontWeight="regular">
                        Posted on
                      </MDTypography>
                    </MDBox>
                    <MDBox ml="auto">
                      <MDTypography variant="subtitle1" color="dark">
                        {new Date(adDetails.Posted_Date).toLocaleString()}
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                  <MDBox component="li" display="flex" alignItems="center" py={1} mb={1}>
                    <MDBox
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      justifyContent="center"
                    >
                      <MDTypography variant="h5" fontWeight="regular">
                        Source
                      </MDTypography>
                    </MDBox>
                    <MDBox ml="auto">
                      <MDTypography variant="subtitle1" color="dark">
                        {adDetails.Source}
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                </MDBox>
                <MDTypography variant="h4" fontWeight="medium" color="primary">
                  Contact Information
                </MDTypography>
                <MDBox component="ul" display="flex" flexDirection="column" p={1} m={0}>
                  <MDBox component="li" display="flex" alignItems="center" py={1} mb={1}>
                    <MDBox
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      justifyContent="center"
                    >
                      <MDTypography variant="h5" fontWeight="regular">
                        Phone Numbers
                      </MDTypography>
                    </MDBox>
                    <MDBox ml="auto">
                      {adDetails.Contact_Info.Phone_Number.map((phoneNumber, index) => (
                        <MDButton
                          key={index}
                          component="a"
                          href={`tel:${phoneNumber}`}
                          target="_blank"
                          rel="noreferrer"
                          variant="text"
                          color="primary"
                        >
                          <MDTypography variant="h6">{phoneNumber}</MDTypography>
                        </MDButton>
                      ))}
                    </MDBox>
                  </MDBox>
                  <MDBox component="li" display="flex" alignItems="center" py={1} mb={1}>
                    <MDBox
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      justifyContent="center"
                    >
                      <MDTypography variant="h5" fontWeight="regular">
                        Email
                      </MDTypography>
                    </MDBox>
                    <MDBox ml="auto">
                      <MDButton
                        component="a"
                        href={`mailto:${adDetails.Contact_Info.Email}`}
                        target="_blank"
                        rel="noreferrer"
                        variant="text"
                        color="primary"
                      >
                        <MDTypography variant="h6">{adDetails.Contact_Info.Email}</MDTypography>
                      </MDButton>
                    </MDBox>
                  </MDBox>
                </MDBox>

                <MDTypography variant="h4" fontWeight="medium" color="primary">
                  Location
                </MDTypography>
                <MDBox component="ul" display="flex" flexDirection="column" p={1} m={0}>
                  <MDBox component="li" display="flex" alignItems="center" py={1} mb={1}>
                    <MDBox
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      justifyContent="center"
                    >
                      <MDTypography variant="h5" fontWeight="regular">
                        Nearest City
                      </MDTypography>
                    </MDBox>
                    <MDBox ml="auto">
                      <MDTypography variant="h5" color="dark" fontWeight="regular">
                        {adDetails.Location.City}
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                  <MDBox component="li" display="flex" alignItems="center" py={1} mb={1}>
                    <MDBox
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      justifyContent="center"
                    >
                      <MDTypography variant="h5" fontWeight="regular">
                        Land Marks
                      </MDTypography>
                    </MDBox>
                    <MDBox ml="auto">
                      {adDetails.Special_Landmarks.map((landmark, index) => (
                        <MDTypography key={index} variant="h5" fontWeight="regular">
                          {landmark}
                        </MDTypography>
                      ))}
                    </MDBox>
                  </MDBox>
                  <MDBox component="li" display="flex" alignItems="center" py={1} mb={1}>
                    <MDBox
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      justifyContent="center"
                    >
                      <MDButton color="primary" onClick={redirectToGoogleMaps}>
                        Open in Google Maps
                      </MDButton>
                    </MDBox>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </Container>
        </div>
      );
    } else if (id[2] === "3") {
      // Render details for wedding proposals category
      return (
        <div>
          <MDTypography textAlign="center" variant="h1" fontWeight="medium" color="primary">
            {adDetails.Title}
          </MDTypography>
          <MDTypography textAlign="center" variant="h3" fontWeight="regular" color="text">
            {adDetails.Description}
          </MDTypography>

          <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Card sx={{ my: { xs: 2, md: 4 }, p: { xs: 2, md: 3 } }}>
              <MDBox p={2}>
                <MDTypography variant="h4" fontWeight="medium" color="primary">
                  General Information
                </MDTypography>
                <MDBox component="ul" display="flex" flexDirection="column" p={1} m={0}>
                  <MDBox component="li" display="flex" alignItems="center" py={1} mb={1}>
                    <MDBox
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      justifyContent="center"
                    >
                      <MDTypography variant="h5" fontWeight="regular">
                        Gender
                      </MDTypography>
                    </MDBox>
                    <MDBox ml="auto">
                      <MDTypography color="dark" variant="subtitle1" fontWeight="medium">
                        {adDetails.Gender}
                      </MDTypography>
                    </MDBox>
                  </MDBox>

                  <MDBox component="li" display="flex" alignItems="center" py={1} mb={1}>
                    <MDBox
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      justifyContent="center"
                    >
                      <MDTypography variant="h5" fontWeight="regular">
                        Age
                      </MDTypography>
                    </MDBox>
                    <MDBox ml="auto">
                      <MDTypography variant="subtitle1" color="dark">
                        {adDetails.Age}
                      </MDTypography>
                    </MDBox>
                  </MDBox>

                  <MDBox component="li" display="flex" alignItems="center" py={1} mb={1}>
                    <MDBox
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      justifyContent="center"
                    >
                      <MDTypography variant="h5" fontWeight="regular">
                        Profession
                      </MDTypography>
                    </MDBox>
                    <MDBox ml="auto">
                      <MDTypography variant="subtitle1" color="dark">
                        {adDetails.Profession}
                      </MDTypography>
                    </MDBox>
                  </MDBox>

                  <MDBox component="li" display="flex" alignItems="center" py={1} mb={1}>
                    <MDBox
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      justifyContent="center"
                    >
                      <MDTypography variant="h5" fontWeight="regular">
                        Nationality
                      </MDTypography>
                    </MDBox>
                    <MDBox ml="auto">
                      <MDTypography variant="subtitle1" color="dark">
                        {adDetails.Nationality}
                      </MDTypography>
                    </MDBox>
                  </MDBox>

                  <MDBox component="li" display="flex" alignItems="center" py={1} mb={1}>
                    <MDBox
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      justifyContent="center"
                    >
                      <MDTypography variant="h5" fontWeight="regular">
                        Other Requirements
                      </MDTypography>
                    </MDBox>
                    <MDBox ml="auto">
                      <MDTypography variant="subtitle1" color="dark">
                        {adDetails.Special_Requirements}
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                  <MDBox component="li" display="flex" alignItems="center" py={1} mb={1}>
                    <MDBox
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      justifyContent="center"
                    >
                      <MDTypography variant="h5" fontWeight="regular">
                        Posted on
                      </MDTypography>
                    </MDBox>
                    <MDBox ml="auto">
                      <MDTypography variant="subtitle1" color="dark">
                        {new Date(adDetails.Posted_Date).toLocaleString()}
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                  <MDBox component="li" display="flex" alignItems="center" py={1} mb={1}>
                    <MDBox
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      justifyContent="center"
                    >
                      <MDTypography variant="h5" fontWeight="regular">
                        Source
                      </MDTypography>
                    </MDBox>
                    <MDBox ml="auto">
                      <MDTypography variant="subtitle1" color="dark">
                        {adDetails.Source}
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                </MDBox>
                <MDTypography variant="h4" fontWeight="medium" color="primary">
                  Contact Information
                </MDTypography>
                <MDBox component="ul" display="flex" flexDirection="column" p={1} m={0}>
                  <MDBox component="li" display="flex" alignItems="center" py={1} mb={1}>
                    <MDBox
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      justifyContent="center"
                    >
                      <MDTypography variant="h5" fontWeight="regular">
                        Phone Numbers
                      </MDTypography>
                    </MDBox>
                    <MDBox ml="auto">
                      {adDetails.Contact_Info.Phone_Number.map((phoneNumber, index) => (
                        <MDButton
                          key={index}
                          component="a"
                          href={`tel:${phoneNumber}`}
                          target="_blank"
                          rel="noreferrer"
                          variant="text"
                          color="primary"
                        >
                          <MDTypography variant="h6">{phoneNumber}</MDTypography>
                        </MDButton>
                      ))}
                    </MDBox>
                  </MDBox>
                  <MDBox component="li" display="flex" alignItems="center" py={1} mb={1}>
                    <MDBox
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      justifyContent="center"
                    >
                      <MDTypography variant="h5" fontWeight="regular">
                        Email
                      </MDTypography>
                    </MDBox>
                    <MDBox ml="auto">
                      <MDButton
                        component="a"
                        href={`mailto:${adDetails.Contact_Info.Email}`}
                        target="_blank"
                        rel="noreferrer"
                        variant="text"
                        color="primary"
                      >
                        <MDTypography variant="h6">{adDetails.Contact_Info.Email}</MDTypography>
                      </MDButton>
                    </MDBox>
                  </MDBox>
                </MDBox>

                <MDTypography variant="h4" fontWeight="medium" color="primary">
                  Location
                </MDTypography>
                <MDBox component="ul" display="flex" flexDirection="column" p={1} m={0}>
                  <MDBox component="li" display="flex" alignItems="center" py={1} mb={1}>
                    <MDBox
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      justifyContent="center"
                    >
                      <MDTypography variant="h5" fontWeight="regular">
                        Nearest City
                      </MDTypography>
                    </MDBox>
                    <MDBox ml="auto">
                      <MDTypography variant="h5" color="dark" fontWeight="regular">
                        {adDetails.Location.City}
                      </MDTypography>
                    </MDBox>
                  </MDBox>

                  <MDBox component="li" display="flex" alignItems="center" py={1} mb={1}>
                    <MDBox
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      justifyContent="center"
                    >
                      <MDButton color="primary" onClick={redirectToGoogleMaps}>
                        Open in Google Maps
                      </MDButton>
                    </MDBox>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </Container>
        </div>
      );
    } else {
      // Render a default message if categoryID doesn't match any known category
      return <Typography variant="body1">Advertisement not found.</Typography>;
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Advertisement Details
      </Typography>

      {adDetails ? (
        // <div>
        //   <Typography variant="h5" component="h2" gutterBottom>
        //     {adDetails.Title}
        //   </Typography>
        //   <Typography variant="body1" paragraph>
        //     {adDetails.Description}
        //   </Typography>
        //   <Typography variant="subtitle1">Posted Date: {adDetails.Posted_Date}</Typography>
        //   <Typography variant="subtitle1">City: {adDetails.Location.City}</Typography>
        //   <Typography variant="subtitle1">
        //     Phone: {adDetails.Contact_Info.Phone_Number[0]} {adDetails.Contact_Info.Phone_Number[1]}
        //   </Typography>
        //   {/* Add more details as needed */}
        // </div>
        <div>{renderAdvertisementDetails()}</div>
      ) : (
        <Typography variant="body1">Advertisement not found.</Typography>
      )}
    </Container>
  );
};

export default Addetail;

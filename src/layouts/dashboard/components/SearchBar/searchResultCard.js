import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import Card from "@mui/material/Card";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import homeDecor1 from "assets/images/land.jpg";
import homeDecor2 from "assets/images/house (1).jpg";
import homeDecor3 from "assets/images/wedding.jpg";

const SearchResultCard = ({ ad }) => {
  // Extract the category from the Advertisement_ID
  const getCategoryFromId = (advertisementId) => {
    const idNumber = parseInt(advertisementId[2]);
    if (idNumber === 1) {
      return "House Sale";
    } else if (idNumber === 2) {
      return "Land Sale";
    } else if (idNumber === 3) {
      return "Marriage Proposals";
    } else {
      return "Unknown Category"; // Add a default category or handle as needed
    }
  };

  const category = getCategoryFromId(ad.Advertisement_ID);

  const categoryToImage = {
    "Land Sale": homeDecor1,
    "House Sale": homeDecor2,
    "Marriage Proposals": homeDecor3,
    // Add more categories and corresponding image paths as needed
  };

  return (
    <Card elevation={3} style={{ padding: "12px", marginBottom: "16px" }}>
      <DefaultProjectCard
        image={categoryToImage[category] || homeDecor1}
        label={category}
        title={ad.Title}
        description={ad.Description}
        action={{
          type: "internal",
          route: `/advertisement/${ad.Advertisement_ID}`,
          color: "info",
          label: "View Ad",
        }}
      />
    </Card>
  );
};

// Define propTypes for the component
SearchResultCard.propTypes = {
  ad: PropTypes.shape({
    Advertisement_ID: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    // Add other expected prop types here
  }).isRequired,
};

export default SearchResultCard;

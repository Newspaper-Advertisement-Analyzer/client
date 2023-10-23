/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAvatar from "components/MDAvatar";
import { useRef, useState, useEffect } from "react";
import { Box } from "@mui/material";

function DefaultProjectCard({ image, label, title, description, action, authors }) {
  const renderAuthors = authors.map(({ image: media, name }) => (
    <Tooltip key={name} title={name} placement="bottom">
      <MDAvatar
        src={media}
        alt={name}
        size="xs"
        sx={({ borders: { borderWidth }, palette: { white } }) => ({
          border: `${borderWidth[2]} solid ${white.main}`,
          cursor: "pointer",
          position: "relative",
          ml: -1.25,

          "&:hover, &:focus": {
            zIndex: "10",
          },
        })}
      />
    </Tooltip>
  ));

  const cardRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkVisibility = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        setIsVisible(rect.top < window.innerHeight);
      }
    };

    // Initial check
    checkVisibility();

    // Add a scroll event listener to check if the card is in view
    window.addEventListener("scroll", checkVisibility);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener("scroll", checkVisibility);
    };
  }, []);

  const cardStyle = {
    animation: "fadeIn 2s ease-out",
    opacity: 0, // Initial opacity set to 0
    transform: "translateY(20px)", // Initial position below the viewport
  };

  return (
    <Card
      ref={cardRef}
      style={isVisible ? { ...cardStyle, opacity: 1, transform: "translateY(0)" } : cardStyle}
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
        boxShadow: "none",
        overflow: "visible",
      }}
    >
      <MDBox position="relative" width="100.25%" shadow="xl" borderRadius="xl">
        <Box sx={{ position: "relative", paddingTop: "75%" }}>
          <CardMedia
            src={image}
            component="img"
            title={title}
            sx={{
              maxWidth: "100%",
              margin: 0,
              boxShadow: ({ boxShadows: { md } }) => md,
              objectFit: "cover",
              objectPosition: "center",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
      </MDBox>

      <MDBox mt={1} mx={0.5}>
        <MDTypography variant="button" fontWeight="regular" color="text" textTransform="capitalize">
          {label}
        </MDTypography>
        <MDBox mb={1} style={{ overflow: "hidden" }}>
          {action.type === "internal" ? (
            <MDTypography
              component={Link}
              to={action.route}
              variant="h5"
              textTransform="capitalize"
              style={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
                maxWidth: "100%", // You can adjust this value as needed
              }}
            >
              {title}
            </MDTypography>
          ) : (
            <MDTypography
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="h5"
              textTransform="capitalize"
              style={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
                maxWidth: "100%", // You can adjust this value as needed
              }}
            >
              {title}
            </MDTypography>
          )}
        </MDBox>
        <MDBox mb={3} lineHeight={0} style={{ overflow: "hidden" }}>
          <MDTypography
            variant="button"
            fontWeight="light"
            color="text"
            style={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
              maxWidth: "100%", // You can adjust this value as needed
            }}
          >
            {description}
          </MDTypography>
        </MDBox>
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
          {action.type === "internal" ? (
            <MDButton
              component={Link}
              to={action.route}
              variant="outlined"
              size="small"
              color={action.color}
            >
              {action.label}
            </MDButton>
          ) : (
            <MDButton
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="outlined"
              size="small"
              color={action.color}
            >
              {action.label}
            </MDButton>
          )}
          <MDBox display="flex">{renderAuthors}</MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of DefaultProjectCard
DefaultProjectCard.defaultProps = {
  authors: [],
};

// Typechecking props for the DefaultProjectCard
DefaultProjectCard.propTypes = {
  image: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]),
    route: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
      "white",
    ]).isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  authors: PropTypes.arrayOf(PropTypes.object),
};

export default DefaultProjectCard;

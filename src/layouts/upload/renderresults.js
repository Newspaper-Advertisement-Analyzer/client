import React from "react";
import { useNavigate } from "react-router-dom";

// import LinearProgress from "@mui/material/LinearProgress";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";

function RenderResults({ backendResponse }) {
  const navigate = useNavigate();
  let categoryFields;
  if (backendResponse[4] === "Land Sales") {
    categoryFields = (
      <MDBox mt={5} mb={3} alignItems="center" fullWidth>
        <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
          <MDTypography variant="body1">Title: {backendResponse[0]}</MDTypography>
        </Card>
        {/* <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
      <MDTypography variant="body1">Text: {backendResponse[1]}</MDTypography>
    </Card> */}
        <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
          <MDTypography variant="body1">Description: {backendResponse[2]}</MDTypography>
        </Card>
        {/* <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
          <MDTypography variant="body1">Keywords: {backendResponse[3].join(", ")}</MDTypography>
        </Card> */}
        <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
          <MDTypography variant="body1">Category: {backendResponse[4]}</MDTypography>
        </Card>
        <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
          <MDTypography variant="body1">Price: {backendResponse[5]}</MDTypography>
        </Card>
        {backendResponse[9] && (
          <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
            <MDTypography variant="body1">Number of Perches: {backendResponse[9]}</MDTypography>
          </Card>
        )}
        <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
          <MDTypography variant="body1">Contact Numbers: {backendResponse[6]}</MDTypography>
        </Card>
        {backendResponse[8] && (
          <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
            <MDTypography variant="body1">
              Contact Emails: {backendResponse[8].join(", ")}
            </MDTypography>
          </Card>
        )}
        {backendResponse[11] && (
          <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
            <MDTypography variant="body1">
              Special LandMarks: {backendResponse[11].join(", ")}
            </MDTypography>
          </Card>
        )}
        {backendResponse[10] && (
          <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
            <MDTypography variant="body1">Source: {backendResponse[10]}</MDTypography>
          </Card>
        )}

        {backendResponse[7].length > 0 && (
          <Card elevation={3} style={{ padding: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <MDTypography variant="body1">
                Locations: {backendResponse[7].join(", ")}
              </MDTypography>
              <MDButton
                color="primary"
                onClick={() => {
                  // Define the query parameter object with the locations
                  const queryParams = {
                    locations: backendResponse[7].join(", "),
                  };

                  // Navigate to the '/advertisement_map' route with query parameters
                  navigate(`/advertisement_map?locations=${queryParams.locations}`);
                }}
              >
                View Locations
              </MDButton>
            </div>
          </Card>
        )}
      </MDBox>
    );
  } else if (backendResponse[4] === "House Sales") {
    categoryFields = (
      <MDBox mt={5} mb={3} alignItems="center" fullWidth>
        <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
          <MDTypography variant="body1">Title: {backendResponse[0]}</MDTypography>
        </Card>
        <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
          <MDTypography variant="body1">Description: {backendResponse[2]}</MDTypography>
        </Card>
        {/* <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
          <MDTypography variant="body1">Keywords: {backendResponse[3].join(", ")}</MDTypography>
        </Card> */}
        <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
          <MDTypography variant="body1">Category: {backendResponse[4]}</MDTypography>
        </Card>
        <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
          <MDTypography variant="body1">Price: {backendResponse[5]}</MDTypography>
        </Card>
        {backendResponse[9] && (
          <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
            <MDTypography variant="body1">Number of Rooms: {backendResponse[9]}</MDTypography>
          </Card>
        )}

        <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
          <MDTypography variant="body1">Contact Numbers: {backendResponse[6]}</MDTypography>
        </Card>
        {backendResponse[8] && (
          <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
            <MDTypography variant="body1">Contact Emails: {backendResponse[8]}</MDTypography>
          </Card>
        )}
        {backendResponse[10] && (
          <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
            <MDTypography variant="body1">Source: {backendResponse[10]}</MDTypography>
          </Card>
        )}
        {backendResponse[7].length > 0 && (
          <Card elevation={3} style={{ padding: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <MDTypography variant="body1">
                Locations: {backendResponse[7].join(", ")}
              </MDTypography>
              <MDButton
                color="primary"
                onClick={() => {
                  // Define the query parameter object with the locations
                  const queryParams = {
                    locations: backendResponse[7].join(", "),
                  };

                  // Navigate to the '/advertisement_map' route with query parameters
                  navigate(`/advertisement_map?locations=${queryParams.locations}`);
                }}
              >
                View Locations
              </MDButton>
            </div>
          </Card>
        )}
      </MDBox>
    );
  } else if (backendResponse[4] === "Marriage Proposals") {
    categoryFields = (
      <MDBox mt={5} mb={3} alignItems="center" fullWidth>
        <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
          <MDTypography variant="body1">Title: {backendResponse[0]}</MDTypography>
        </Card>
        <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
          <MDTypography variant="body1">Description: {backendResponse[2]}</MDTypography>
        </Card>
        {/* <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
          <MDTypography variant="body1">Keywords: {backendResponse[3].join(", ")}</MDTypography>
        </Card> */}
        <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
          <MDTypography variant="body1">Category: {backendResponse[4]}</MDTypography>
        </Card>
        <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
          <MDTypography variant="body1">Gender: {backendResponse[5]}</MDTypography>
        </Card>
        <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
          <MDTypography variant="body1">Age: {backendResponse[9]}</MDTypography>
        </Card>
        <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
          <MDTypography variant="body1">Profession: {backendResponse[11]}</MDTypography>
        </Card>
        <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
          <MDTypography variant="body1">Special Requirements: {backendResponse[12]}</MDTypography>
        </Card>
        <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
          <MDTypography variant="body1">Nationality: {backendResponse[13]}</MDTypography>
        </Card>
        <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
          <MDTypography variant="body1">Contact Numbers: {backendResponse[6]}</MDTypography>
        </Card>
        {backendResponse[8] && (
          <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
            <MDTypography variant="body1">Contact Emails: {backendResponse[8]}</MDTypography>
          </Card>
        )}
        {backendResponse[10] && (
          <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
            <MDTypography variant="body1">Source: {backendResponse[10]}</MDTypography>
          </Card>
        )}
        {backendResponse[7].length > 0 && (
          <Card elevation={3} style={{ padding: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <MDTypography variant="body1">
                Locations: {backendResponse[7].join(", ")}
              </MDTypography>
              <MDButton
                color="primary"
                onClick={() => {
                  // Define the query parameter object with the locations
                  const queryParams = {
                    locations: backendResponse[7].join(", "),
                  };

                  // Navigate to the '/advertisement_map' route with query parameters
                  navigate(`/advertisement_map?locations=${queryParams.locations}`);
                }}
              >
                View Locations
              </MDButton>
            </div>
          </Card>
        )}
      </MDBox>
    );
  } else {
    categoryFields = (
      <MDBox mt={5} mb={3} alignItems="center" fullWidth>
        <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
          <MDTypography variant="body1">Title: {backendResponse[0]}</MDTypography>
        </Card>
        <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
          <MDTypography variant="body1">Description: {backendResponse[2]}</MDTypography>
        </Card>
        {/* <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
          <MDTypography variant="body1">Keywords: {backendResponse[3].join(", ")}</MDTypography>
        </Card> */}
        <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
          <MDTypography variant="body1">Category: {backendResponse[4]}</MDTypography>
        </Card>
      </MDBox>
    );
  }

  return <div>{categoryFields}</div>;
}

RenderResults.propTypes = {
  // Add the missing prop type validations here
  backendResponse: PropTypes.array, // It should be an array and required.

  // Example for other missing validations:
  backendResponseJoin: PropTypes.string, // If you have a prop for joining the array as a string
  backendResponseLength: PropTypes.number, // If you have a prop for the array's length
};

export default RenderResults;

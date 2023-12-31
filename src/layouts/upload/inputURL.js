import React, { useState, useEffect } from "react";
import { useAppState } from "utils/userContext";

// import LinearProgress from "@mui/material/LinearProgress";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import Card from "@mui/material/Card";

import { sendUrlToBackend } from "api/advertisementextract/sendUrl";
import Loading from "react-loading";
import { CardContent, Checkbox, Grid, Modal } from "@mui/material";
import emptyImage from "./empty.gif";
import RenderResults from "./renderresults";

function InputURL() {
  const [loading, setLoading] = useState(false);
  const { state } = useAppState();
  const inputUrl = state.inputUrl;
  const setInputUrl = state.setInputUrl;
  const backendResponse = state.backendResponse;
  const setBackendResponse = state.setBackendResponse;

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < backendResponse.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }, 1000); // Adjust the delay (in milliseconds) as needed for your desired animation speed

    return () => clearTimeout(timer);
  }, [currentIndex, backendResponse]);

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setBackendResponse([]); // Clear previous results

    // Send URL to backend
    sendUrlToBackend(inputUrl, publish)
      .then((responseData) => {
        console.log("Response from backend:", responseData);
        setBackendResponse(responseData.results); // Assuming 'results' is the key holding the array
        if (responseData.results[4] === "Couldn't found a category") {
          handleOpenModal();
        }
      })
      .catch((error) => {
        console.error("Error sending URL to backend:", error);
        alert("Sorry. Server error from our side. Try Again in a few seconds");
      })
      .finally(() => {
        setLoading(false); // Set loading to false after fetch operation is complete
      });
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const [publish, setPublish] = useState(false);
  const handlePublishChange = (e) => {
    setPublish(e.target.checked);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const emptyModal = (
    <Modal
      open={isModalOpen}
      onClose={handleCloseModal}
      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Card style={{ backgroundColor: "#aedcf3" }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} mt={5}>
              <MDTypography variant="h3" fontWeight="medium" textAlign="center">
                Oops ! We couldn&apos;t find a category for your advertisement.
              </MDTypography>
              <MDTypography variant="h3" fontWeight="medium" textAlign="center">
                Try another one
              </MDTypography>
              <MDBox display="flex" justifyContent="center" alignItems="center">
                <img src={emptyImage} alt="undraw-Add-user-re-5oib" border="0" />
              </MDBox>
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
        </CardContent>
      </Card>
    </Modal>
  );

  return (
    <MDBox>
      <MDBox
        mt={5}
        mb={3}
        alignItems="center"
        sx={{
          display: "flex",
          flexDirection: "column", // To center horizontally and vertically
          justifyContent: "center", // To center horizontally and vertically
          alignItems: "center",
          maxWidth: "100%",
        }}
      >
        <Card
          sx={{
            width: "100%",
          }}
          elevation={3}
          style={{ padding: "12px", alignItems: "center" }}
        >
          {emptyModal}
          <form onSubmit={handleUrlSubmit}>
            <label>
              <MDTypography
                textAlign="center"
                variant="h4"
                fontWeight="medium"
                mt={1}
                mb={5}
                sx={{
                  // Define a font size for mobile screens using a media query
                  "@media (max-width: 600px)": {
                    fontSize: "1rem", // Adjust the font size as needed
                  },
                }}
              >
                Enter URL to be analyzed
              </MDTypography>
              <MDBox alignItems="center">
                <MDBox mb={2} alignItems="center">
                  <MDInput
                    alignItems="center"
                    type="url"
                    label="Enter URL"
                    fullWidth
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="https://example.com"
                    required
                  />
                </MDBox>
              </MDBox>
            </label>
            <div>
              <Checkbox
                id="publish"
                checked={publish}
                onChange={handlePublishChange}
                inputProps={{ "aria-label": "controlled" }}
              />
              <label style={{ fontSize: "15px" }} htmlFor="publish">
                <MDTypography variant="button" fontWeight="regular" color="dark">
                  We value your privacy. Check the box if you like to publish your advertisement
                  details
                </MDTypography>
              </label>
            </div>
            <MDBox mt={5} mb={3}>
              <MDButton color="primary" type="submit">
                Analyze
              </MDButton>
            </MDBox>
          </form>
        </Card>

        {loading && (
          <div style={{ marginTop: "5px" }}>
            <MDTypography variant="h4" fontWeight="regular" color="dark">
              Analyzing...
            </MDTypography>
            <Loading type="bars" color="#755BB4" />
          </div>
        )}

        {backendResponse.length > 0 && (
          <MDBox mt={5} mb={3} alignItems="center" fullWidth>
            <RenderResults backendResponse={backendResponse} />
          </MDBox>
        )}
      </MDBox>
    </MDBox>
  );
}

export default InputURL;

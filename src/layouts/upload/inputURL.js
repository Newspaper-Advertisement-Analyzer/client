import React, { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import { Paper } from "@mui/material";

function InputURL() {
  const [inputUrl, setInputUrl] = useState("");
  const [backendResponse, setBackendResponse] = useState([]);
  const [loading, setLoading] = useState(false);

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
    fetch("/sendurl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: inputUrl }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Response from backend:", responseData);
        setBackendResponse(responseData.results); // Assuming 'results' is the key holding the array
      })
      .catch((error) => {
        console.error("Error sending URL to backend:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after fetch operation is complete
      });
  };

  return (
    <div>
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
        <form onSubmit={handleUrlSubmit}>
          <label>
            <MDTypography
              textAlign="center"
              variant="h4"
              fontWeight="medium"
              color="black"
              mt={1}
              mb={5}
            >
              Enter URL to be analyzed
            </MDTypography>
            <MDBox
              alignItems="center"
              sx={{
                width: 500,
                maxWidth: "100%",
              }}
            >
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
          <MDBox mt={5} mb={3}>
            <MDButton color="primary" type="submit">
              Analyze
            </MDButton>
          </MDBox>
        </form>

        {loading && (
          <div>
            <p>Analyzing...</p>
            <LinearProgress />
          </div>
        )}

        {backendResponse.length > 0 && (
          // <div>
          //   <p>Results:</p>
          //   <div>
          //     <p>Title: {backendResponse[0]}</p>
          //     <p>Text: {backendResponse[1]}</p>
          //     <p>Summary: {backendResponse[2]}</p>
          //     <p>Keywords: {backendResponse[3].join(", ")}</p>
          //     <p>Category: {backendResponse[4]}</p>
          //     <p>Price: {backendResponse[5]}</p>
          //     <p>Contact: {backendResponse[6]}</p>
          //     <p>Locations: {backendResponse[7].join(", ")}</p>
          //   </div>
          // </div>
          <MDBox mt={5} mb={3} alignItems="center" fullWidth>
            <Paper elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
              <MDTypography variant="body1">Title: {backendResponse[0]}</MDTypography>
            </Paper>
            <Paper elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
              <MDTypography variant="body1">Text: {backendResponse[1]}</MDTypography>
            </Paper>
            <Paper elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
              <MDTypography variant="body1">Summary: {backendResponse[2]}</MDTypography>
            </Paper>
            <Paper elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
              <MDTypography variant="body1">Keywords: {backendResponse[3].join(", ")}</MDTypography>
            </Paper>
            <Paper elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
              <MDTypography variant="body1">Category: {backendResponse[4]}</MDTypography>
            </Paper>
            <Paper elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
              <MDTypography variant="body1">Price: {backendResponse[5]}</MDTypography>
            </Paper>
            <Paper elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
              <MDTypography variant="body1">Contact: {backendResponse[6]}</MDTypography>
            </Paper>
            <Paper elevation={3} style={{ padding: "16px" }}>
              <MDTypography variant="body1">
                Locations: {backendResponse[7].join(", ")}
              </MDTypography>
            </Paper>
            {/* {backendResponse.slice(0, currentIndex + 1).map((item, index) => (
              <Paper
                elevation={3}
                style={{
                  padding: "16px",
                  marginBottom: "16px",
                  transition: "transform 0.5s ease-in-out",
                  transform: `translateY(${index === currentIndex ? 0 : 100}%)`,
                }}
                key={index}
              >
                <MDTypography variant="body1">{item}</MDTypography>
              </Paper>
            ))} */}
          </MDBox>
        )}
      </MDBox>
    </div>
  );
}

export default InputURL;

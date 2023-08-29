import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LinearProgress from "@mui/material/LinearProgress";

function InputURL() {
  const [inputUrl, setInputUrl] = useState("");
  const [backendResponse, setBackendResponse] = useState([]);
  const [loading, setLoading] = useState(false);

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
      <form onSubmit={handleUrlSubmit}>
        <label>
          <p>Enter URL to be analyzed:</p>
          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
            }}
          >
            <TextField
              fullWidth
              label="Enter URL"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="https://example.com"
              required
            />
          </Box>
        </label>
        <Button variant="contained" type="submit">
          Analyze
        </Button>
      </form>
      <br />

      {loading && (
        <div>
          <p>Analyzing...</p>
          <LinearProgress />
        </div>
      )}

      {backendResponse.length > 0 && (
        <div>
          <p>Results:</p>
          <div>
            <p>Title: {backendResponse[0]}</p>
            <p>Text: {backendResponse[1]}</p>
            <p>Summary: {backendResponse[2]}</p>
            <p>Keywords: {backendResponse[3].join(", ")}</p>
            <p>Category: {backendResponse[4]}</p>
            <p>Price: {backendResponse[5]}</p>
            <p>Contact: {backendResponse[6]}</p>
            <p>Locations: {backendResponse[7].join(", ")}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default InputURL;

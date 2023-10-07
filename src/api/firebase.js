const functions = require("firebase-functions");
const axios = require("axios");

exports.myFlaskFunction = functions.https.onRequest((request, response) => {
  // Define the URL of your local Flask server
  const flaskServerURL = "http://16.170.163.211:5000/"; // Replace with your Flask server's URL

  // Proxy the incoming request to the Flask server
  axios({
    method: request.method,
    url: `${flaskServerURL}${request.url}`,
    data: request.body,
    headers: request.headers,
  })
    .then((flaskResponse) => {
      // Send the Flask server's response back to the client
      response.status(flaskResponse.status).send(flaskResponse.data);
    })
    .catch((error) => {
      console.error("Error:", error);
      response.status(500).send("Proxy Error");
    });
});

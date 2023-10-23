// api/backendApi.js

import baseURL from "config";

export async function sendUrlToBackend(inputUrl, publish) {
  try {
    const response = await fetch(`${baseURL}/sendurl`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: inputUrl, publish: publish }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error sending URL to backend:", error);
    throw error; // Re-throw the error for the caller to handle
  }
}

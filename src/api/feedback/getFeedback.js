// api.js
import axios from "axios";
import baseURL from "config";

export async function getFeedbackData() {
  try {
    const response = await axios.get(`${baseURL}/getFeedbackData`); // Adjust the endpoint URL
    return response.data;
  } catch (error) {
    console.error("Error getting feedback data:", error);
    throw error;
  }
}

// api.js
import axios from "axios";
import baseURL from "config";

export async function submitFeedback(data) {
  try {
    const response = await axios.post(`${baseURL}/submitFeedback`, data);
    return response.data;
  } catch (error) {
    console.error("Error submitting feedback:", error);
    throw error;
  }
}

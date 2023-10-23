import axios from "axios";
import baseURL from "config";

export async function fetchPendingAdvertisements() {
  try {
    const response = await axios.get(`${baseURL}/pendingAdvertisements`); // Adjust the endpoint URL
    return response.data;
  } catch (error) {
    console.error("Error fetching pending advertisements:", error);
    throw error;
  }
}

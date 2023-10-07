import axios from "axios";
import baseURL from "config";

// Function to fetch data from the backend
export async function getRecentAdLocation(ad_type, duration) {
  try {
    const response = await axios.get(
      `${baseURL}/getRecentAdLocation?adtype=${ad_type}&duration=${duration}`
    ); // Adjust the endpoint URL
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data from the backend:", error);
    throw error;
  }
}

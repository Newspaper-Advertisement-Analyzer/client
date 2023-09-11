import axios from "axios";

// Function to fetch data from the backend
export async function getAverageLandPrice(interval, district) {
  try {
    const response = await axios.get(
      `/getAverageLandPrice?interval=${interval}&district=${district}`
    ); // Adjust the endpoint URL
    return response.data;
  } catch (error) {
    console.error("Error fetching data from the backend:", error);
    throw error;
  }
}

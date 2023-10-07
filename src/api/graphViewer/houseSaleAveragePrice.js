import axios from "axios";
import baseURL from "config";

// Function to fetch data from the backend
export async function getAverageHousePrice(interval, district) {
  try {
    const response = await axios.get(
      `${baseURL}/getAverageHousePrice?interval=${interval}&district=${district}`
    ); // Adjust the endpoint URL
    return response.data;
  } catch (error) {
    console.error("Error fetching data from the backend:", error);
    throw error;
  }
}

import axios from "axios";
import baseURL from "config";

// Function to fetch data from the backend
export async function getAdDistribution() {
  try {
    const response = await axios.get(`${baseURL}/adDistribution`); // Replace with your API endpoint URL
    return response.data;
  } catch (error) {
    console.error("Error fetching data from the backend:", error);
    throw error;
  }
}

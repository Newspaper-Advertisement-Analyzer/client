import axios from "axios";

// Function to fetch data from the backend
export async function getAgeDistribution() {
  try {
    const response = await axios.get("/categorizebyAge");
    return response.data;
  } catch (error) {
    console.error("Error fetching data from the backend:", error);
    throw error;
  }
}

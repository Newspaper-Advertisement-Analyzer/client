import axios from "axios";
import baseURL from "config";

// Function to fetch data from the backend
export async function getAgeDistribution(criteria) {
  try {
    const response = await axios.get(`${baseURL}/categorizeby?criteria=${criteria}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data from the backend:", error);
    throw error;
  }
}

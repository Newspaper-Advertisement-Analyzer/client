import axios from "axios";
import baseURL from "config";

// Function to fetch data from the backend
export async function getPriceFluct() {
  try {
    const response = await axios.get(`${baseURL}/priceFluctuationData`); // Adjust the endpoint URL
    return response.data;
  } catch (error) {
    console.error("Error fetching data from the backend:", error);
    throw error;
  }
}

import axios from "axios";

// Function to fetch data from the backend
export async function getCounts() {
  try {
    const response = await axios.get("/getcounts"); // Replace with your API endpoint URL
    return response.data;
  } catch (error) {
    console.error("Error fetching data from the backend:", error);
    throw error;
  }
}
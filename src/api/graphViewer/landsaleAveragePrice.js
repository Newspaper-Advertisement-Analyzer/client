import axios from "axios";

// Function to fetch data from the backend
export async function getAverageLandPrice() {
  try {
    const response = await axios.get("/getAverageLandPrice"); // Replace with your API endpoint URL
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching data from the backend:", error);
    throw error;
  }
}

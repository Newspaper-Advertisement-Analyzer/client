import axios from "axios";

// Function to fetch data from the backend
export async function getPopularAd() {
  try {
    const response = await axios.get("/getPopularAd"); // Adjust the endpoint URL
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data from the backend:", error);
    throw error;
  }
}

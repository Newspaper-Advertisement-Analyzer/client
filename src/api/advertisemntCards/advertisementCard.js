import axios from "axios";
import baseURL from "config";

// Function to fetch data from the backend
export async function getPopularAd() {
  try {
    const response = await axios.get(`${baseURL}/getPopularAd`); // Adjust the endpoint URL
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data from the backend:", error);
    throw error;
  }
}

export async function getAdDetail(adID) {
  try {
    const response = await axios.get(`${baseURL}/getAdDetails?adID=${adID}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data from the backend:", error);
    throw error;
  }
}

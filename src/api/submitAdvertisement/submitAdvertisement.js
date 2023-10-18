import axios from "axios";
import baseURL from "config";

export async function submitAdvertisement(formData) {
  console.log("submitAdvertisement formData:", formData);
  try {
    const response = await axios.post(`${baseURL}/submitAdvertisement`, formData); // Adjust the endpoint URL
    return response.data;
  } catch (error) {
    console.error("Error submitting advertisement:", error);
    throw error;
  }
}

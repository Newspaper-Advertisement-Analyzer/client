import axios from "axios";
import baseURL from "config";

// Function to fetch data from the backend
export async function getReportList(userID) {
  try {
    const response = await axios.post(`${baseURL}/get-all-reports`, { userID }); // Adjust the endpoint URL
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data from the backend:", error);
    throw error;
  }
}

import axios from "axios";
import baseURL from "config";

// Function to update user information on the backend
export async function updateUser(userData) {
  try {
    const response = await axios.post(`${baseURL}/updateUser`, userData); // Adjust the endpoint URL
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating user data on the backend:", error);
    throw error;
  }
}

export async function updateProfilePicture(url, userId) {
  try {
    const response = await axios.post(`${baseURL}/updateProfilePicture`, { url, userId }); // Adjust the endpoint URL
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating user data on the backend:", error);
    throw error;
  }
}

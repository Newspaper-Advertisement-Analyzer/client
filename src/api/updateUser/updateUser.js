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

export async function updateLastSeen(userid) {
  try {
    const last_seen = Date.now(); // Obtain the timestamp
    const date = new Date(last_seen); // Convert the timestamp to a Date object
    const lastSeenDate = date.toLocaleDateString(); // Obtain the date in a locale-specific format
    const lastSeenTime = date.toLocaleTimeString(); // Obtain the time in a locale-specific format
    const lastSeenDateTime = `${lastSeenDate} ${lastSeenTime}`; // Combine the date and time
    console.log(userid, lastSeenDateTime);
    const response = await axios.post(`${baseURL}/updateLastSeen`, {
      last_seen: lastSeenDateTime,
      userId: userid,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user data on the backend:", error);
    throw error;
  }
}

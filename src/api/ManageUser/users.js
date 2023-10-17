import axios from "axios";
import baseURL from "config";

// Function to delete a user
export async function deleteUser(userId) {
  try {
    const response = await axios.post(`${baseURL}/delete-user`, { user_ID: userId });
    if (response.status === 200) {
      console.log(response.data.message); // Assuming the response has a message field
    } else {
      console.error("Failed to delete user:", response.statusText);
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

// Function to edit user details
export async function editUser(userId, updatedData) {
  try {
    const response = await axios.post(`${baseURL}/updateUser`, {
      userId: userId,
      fullName: updatedData.fullName,
      mobile: updatedData.contactNumber,
      profession: updatedData.profession,
    });
    if (response.status === 200) {
      console.log(response.data.message); // Assuming the response has a message field
    } else {
      console.error("Failed to edit user:", response.statusText);
    }
  } catch (error) {
    console.error("Error editing user:", error);
    throw error;
  }
}

// Function to get the list of users
export async function getUserList() {
  try {
    const response = await axios.get(`${baseURL}/getAllUsers`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to fetch user list:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching user list:", error);
    throw error;
  }
}

import axios from "axios";
import baseURL from "config";

// Function to delete a user
export async function deleteUser(userId) {
  try {
    const response = await axios.delete(`${baseURL}/users/${userId}`);
    if (response.status === 200) {
      console.log(`User with ID ${userId} has been deleted`);
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
    const response = await axios.put(`${baseURL}/users/${userId}`, updatedData);
    if (response.status === 200) {
      console.log(`User with ID ${userId} has been updated`);
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
    const response = await axios.get(`${baseURL}/users`);
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

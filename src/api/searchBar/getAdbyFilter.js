import axios from "axios";

// Function to fetch data from the backend based on search criteria
export async function getAdbyFilter(selectedOption, searchQuery) {
  try {
    const response = await axios.get(
      `/recent-ads?selectedOption=${selectedOption}&searchQuery=${searchQuery}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data from the backend:", error);
    throw error;
  }
}

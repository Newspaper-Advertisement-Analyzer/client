import axios from "axios";
import baseURL from "config";

// Function to fetch data from the backend based on search criteria
export async function getAdbyFilter(selectedOption, searchQuery, startDate, endDate, category) {
  try {
    const response = await axios.get(
      `${baseURL}/filter-ads?selectedOption=${selectedOption}&searchQuery=${searchQuery}&startDate=${startDate}&endDate=${endDate}&category=${category}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data from the backend:", error);
    throw error;
  }
}

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import CategoryDistribution from "layouts/graph/components/barCharts/categoryDist";
import { getAdDistribution } from "api/graphViewer/adDistribution";
import { BrowserRouter } from "react-router-dom";
import { MaterialUIControllerProvider } from "context";
import UserProvider from "utils/userContext";
import theme from "assets/theme";
import { ThemeProvider } from "@mui/material/styles";

// Mock the API function
jest.mock("api/graphViewer/adDistribution", () => ({
  getAdDistribution: jest.fn(),
}));

describe("CategoryDistribution Component", () => {
  it("renders the component with data", async () => {
    const mockData = [
      { label: "Category 1", count: 10 },
      { label: "Category 2", count: 20 },
      // Add more data as needed
    ];

    // Mock the API function to return the data
    getAdDistribution.mockResolvedValue(mockData);

    render(
      <BrowserRouter>
        <MaterialUIControllerProvider>
          <UserProvider>
            <ThemeProvider theme={theme}>
              <CategoryDistribution />
            </ThemeProvider>
          </UserProvider>
        </MaterialUIControllerProvider>
      </BrowserRouter>
    );

    // Wait for the chart to be loaded
    await waitFor(() => {
      // Check if the chart is rendered with data
      expect(screen.getByTestId("chart-container")).toBeInTheDocument();
      expect(screen.getByText("Distribution by Category")).toBeInTheDocument();
      const categoryText = screen.queryByText("Category 1");
      expect(categoryText).toBeInTheDocument();
      expect(screen.getByText("Category 2")).toBeInTheDocument();
      // You can add more assertions as needed
    });
  });

  it("renders the component with an error message on API failure", async () => {
    // Mock the API function to simulate an error
    getAdDistribution.mockRejectedValue(new Error("API Error"));

    render(
      <BrowserRouter>
        <MaterialUIControllerProvider>
          <UserProvider>
            <ThemeProvider theme={theme}>
              <CategoryDistribution />
            </ThemeProvider>
          </UserProvider>
        </MaterialUIControllerProvider>
      </BrowserRouter>
    );

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(screen.getByText("Error fetching data:")).toBeInTheDocument();
      // You can add more assertions related to error handling
    });
  });
});

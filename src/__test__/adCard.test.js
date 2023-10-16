import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AdCard } from "layouts/dashboard/components/adCard"; // adjust the import path accordingly
import { BrowserRouter } from "react-router-dom";
import { MaterialUIControllerProvider } from "context";
import UserProvider from "utils/userContext";
import { ThemeProvider } from "@mui/material";
import theme from "assets/theme";

// Mock the data you expect to receive from the backend
const mockBackendData = [
  {
    Advertisement_ID: 1,
    category: "Land Sale",
    Title: "Sample Land Ad",
    Description: "This is a land ad description",
  },
  {
    Advertisement_ID: 2,
    category: "House Sale",
    Title: "Sample House Ad",
    Description: "This is a house ad description",
  },
  {
    Advertisement_ID: 3,
    category: "Marriage Proposal",
    Title: "Sample Marriage Ad",
    Description: "This is a marriage ad description",
  },
];

// Mock the getPopularAd function
jest.mock("api/advertisemntCards/advertisementCard", () => ({
  getPopularAd: jest.fn(() => Promise.resolve(mockBackendData)),
}));
export const getPopularAd = jest.fn().mockImplementation(() => {
  const data = {
    category: "Land Sale",
    title: "Sample Land Ad",
    description: "This is a land ad description",
  };

  // Log the data before returning it
  console.log("Mocked API data:", data);

  return data;
});
test("renders AdCard component with data", async () => {
  // Render the AdCard component
  const { getByText, getByAltText } = render(
    <BrowserRouter>
      <MaterialUIControllerProvider>
        <UserProvider>
          <ThemeProvider theme={theme}>
            <AdCard />
          </ThemeProvider>
        </UserProvider>
      </MaterialUIControllerProvider>
    </BrowserRouter>
  );

  // Check if loading spinner is displayed
  const loadingElement = getByText("Recent Advertisements");
  expect(loadingElement).toBeInTheDocument();

  // Wait for the data to load (you might want to add a loading state to your component)
  await waitFor(() => {
    const title = screen.getByText("Land Sale");
    expect(title).toBeInTheDocument();
  });
  const title = screen.getByText("Sample Land Ad");
  const description = screen.getByText("This is a land ad description");
  const image = screen.getByAltText("Land Sale");

  // You can add more assertions for other data elements

  expect(category).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(image).toBeInTheDocument();
});

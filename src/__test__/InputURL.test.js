import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import InputURL from "layouts/upload/inputURL";
import { BrowserRouter as Router } from "react-router-dom";
import { MaterialUIControllerProvider } from "context";
import UserProvider from "utils/userContext";
import { ThemeProvider } from "@mui/material";
import theme from "assets/theme";

// Mock the useNavigate function
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("InputURL Component Tests", () => {
  it("renders InputURL component without crashing", () => {
    render(
      <Router>
        <MaterialUIControllerProvider>
          <UserProvider>
            <ThemeProvider theme={theme}>
              <InputURL />
            </ThemeProvider>
          </UserProvider>
        </MaterialUIControllerProvider>
      </Router>
    );

    expect(screen.getByText("Enter URL to be analyzed")).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", {
        name: "Enter URL to be analyzed Enter URL",
      })
    ).toBeInTheDocument();
    expect(screen.getByText("Analyze")).toBeInTheDocument();
  });

  it("allows user to enter a URL", () => {
    render(
      <Router>
        <MaterialUIControllerProvider>
          <UserProvider>
            <ThemeProvider theme={theme}>
              <InputURL />
            </ThemeProvider>
          </UserProvider>
        </MaterialUIControllerProvider>
      </Router>
    );

    const urlInput = screen.getByRole("textbox", {
      name: "Enter URL to be analyzed Enter URL",
    });
    fireEvent.change(urlInput, { target: { value: "https://example.com" } });
    expect(urlInput).toHaveValue("https://example.com");
  });

  it("submits a URL for analysis and displays results", async () => {
    render(
      <Router>
        <MaterialUIControllerProvider>
          <UserProvider>
            <ThemeProvider theme={theme}>
              <InputURL />
            </ThemeProvider>
          </UserProvider>
        </MaterialUIControllerProvider>
      </Router>
    );

    const urlInput = screen.getByRole("textbox", {
      name: "Enter URL to be analyzed Enter URL",
    });
    const analyzeButton = screen.getByText("Analyze");
    fireEvent.change(urlInput, {
      target: {
        value:
          "https://www.hitad.lk/en/ad/1776361-One-Acre-Coconut-Land-For-Sale-In-Kurunegala-Uhumeeya-Hanhamuna-Road?type=house-and-property",
      },
    });
    fireEvent.click(analyzeButton);
    expect(screen.queryByText("Analyzing...")).toBeTruthy();

    // Wait for the loading state to disappear
    await waitFor(
      () => {
        expect(screen.queryByText("Analyzing...")).toBeNull();
      },
      { timeout: 1000 }
    );

    // Check if the analysis results are displayed
    expect(
      screen.findByText("One Acre Coconut Land For Sale In Kurunegala Uhumeeya, Hanhamuna Road")
    ).toBeInTheDocument();
    // Add more assertions to check other parts of the results
  });

  //   it("navigates to advertisement_map on 'View Locations' button click", async () => {
  //     const mockNavigate = jest.fn();
  //     jest.spyOn(require("react-router-dom"), "useNavigate").mockReturnValue(mockNavigate);

  //     render(
  //       <Router>
  //         <MaterialUIControllerProvider>
  //           <UserProvider>
  //             <ThemeProvider theme={theme}>
  //               <InputURL />
  //             </ThemeProvider>
  //           </UserProvider>
  //         </MaterialUIControllerProvider>
  //       </Router>
  //     );

  //     const urlInput = screen.getByLabelText("Enter URL");
  //     const analyzeButton = screen.getByText("Analyze");
  //     fireEvent.change(urlInput, { target: { value: "https://example.com" } });
  //     fireEvent.click(analyzeButton);

  //     // Wait for the loading state to disappear
  //     await waitFor(() => {
  //       expect(screen.queryByText("Analyzing...")).toBeNull();
  //     });

  //     const viewLocationsButton = screen.getByText("View Locations");
  //     fireEvent.click(viewLocationsButton);

  //     // Verify that useNavigate was called with the correct path
  //     expect(mockNavigate).toHaveBeenCalledWith("/advertisement_map?locations=");
  //   });
});

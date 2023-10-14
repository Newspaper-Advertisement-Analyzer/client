// Import necessary dependencies
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ImageUploader from "layouts/upload/inputImage";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { MaterialUIControllerProvider } from "context";
import UserProvider from "utils/userContext";
import { ThemeProvider } from "@mui/material";
import theme from "assets/theme";

// Mock the user context
jest.mock("utils/userContext", () => ({
  useAppState: jest.fn(),
}));

// Sample state for the mock user context
const mockUserContext = {
  state: {
    selectedFiles: [],
    setSelectedFiles: jest.fn(),
    imagePreviews: [],
    setImagePreviews: jest.fn(),
    imgBackendResponse: [],
    setimgBackendResponse: jest.fn(),
  },
};

// Mock the useNavigate function from react-router-dom
const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockUseNavigate,
}));

// Mock the uploadImages function
jest.mock("api/sendImg", () => ({
  uploadImages: jest.fn(),
}));

describe("ImageUploader Component", () => {
  beforeEach(() => {
    // Reset the mock functions and set the user context to the sample state
    jest.clearAllMocks();
    mockUseNavigate.mockClear();
    mockUserContext.state.selectedFiles = [];
    mockUserContext.state.imagePreviews = [];
    mockUserContext.state.imgBackendResponse = [];
  });

  it("renders the component with initial instructions", () => {
    // Use the sample user context in the test
    jest
      .spyOn(require("utils/userContext"), "useAppState")
      .mockImplementation(() => mockUserContext);

    render(
      <BrowserRouter>
        <MaterialUIControllerProvider>
          <UserProvider>
            <ThemeProvider theme={theme}>
              <ImageUploader />
            </ThemeProvider>
          </UserProvider>
        </MaterialUIControllerProvider>
      </BrowserRouter>
    );

    // Ensure the initial instructions are displayed
    expect(screen.getByText(/Drag and drop images here/i)).toBeInTheDocument();
  });

  it("allows file selection and displays selected files count", () => {
    // Use the sample user context in the test
    jest
      .spyOn(require("utils/userContext"), "useAppState")
      .mockImplementation(() => mockUserContext);

    render(
      <BrowserRouter>
        <MaterialUIControllerProvider>
          <UserProvider>
            <ThemeProvider theme={theme}>
              <ImageUploader />
            </ThemeProvider>
          </UserProvider>
        </MaterialUIControllerProvider>
      </BrowserRouter>
    );

    // Mock a file input change event with two valid image files
    const imageInput = screen.getByLabelText("Upload Images");
    fireEvent.change(imageInput, {
      target: {
        files: [
          new File(["file1 content"], "file1.jpg", { type: "image/jpeg" }),
          new File(["file2 content"], "file2.png", { type: "image/png" }),
        ],
      },
    });

    // Ensure the selected files count is displayed
    expect(screen.getByText(/2 files selected/i)).toBeInTheDocument();
  });

  it("handles submission correctly", async () => {
    // Use the sample user context in the test
    jest
      .spyOn(require("utils/userContext"), "useAppState")
      .mockImplementation(() => mockUserContext);

    // Mock the uploadImages function to resolve with a sample response
    const uploadImages = require("api/sendImg").uploadImages;
    uploadImages.mockResolvedValue({ message: [{}, {}] });

    render(
      <BrowserRouter>
        <MaterialUIControllerProvider>
          <UserProvider>
            <ThemeProvider theme={theme}>
              <ImageUploader />
            </ThemeProvider>
          </UserProvider>
        </MaterialUIControllerProvider>
      </BrowserRouter>
    );

    // Mock a file input change event with a valid image file
    const imageInput = screen.getByLabelText("Upload Images");
    fireEvent.change(imageInput, {
      target: {
        files: [new File(["file1 content"], "file1.jpg", { type: "image/jpeg" })],
      },
    });

    // Trigger the submission button click
    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);

    // Ensure the backend response is logged
    await screen.findByText(/Image upload response:/i);

    // Ensure the backend response is displayed correctly
    expect(screen.getByText(/Advertisement 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Advertisement 2/i)).toBeInTheDocument();

    // Ensure the "View Locations" button works
    const viewLocationsButton = screen.getByText(/View Locations/i);
    fireEvent.click(viewLocationsButton);

    // Ensure that the navigation function is called with the correct route
    expect(mockUseNavigate).toHaveBeenCalledWith("/advertisement_map?locations=undefined");
  });
});

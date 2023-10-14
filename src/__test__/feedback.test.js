import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FeedbackSection from "layouts/feedback/feedback";
import { MaterialUIControllerProvider } from "context";

import theme from "assets/theme";
import { ThemeProvider } from "@mui/material/styles";
import UserProvider from "utils/userContext";
import { BrowserRouter } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => jest.fn(),
}));

describe("FeedbackSection", () => {
  test("renders the feedback form", () => {
    render(
      <BrowserRouter>
        <MaterialUIControllerProvider>
          <UserProvider>
            <ThemeProvider theme={theme}>
              <FeedbackSection />
            </ThemeProvider>
          </UserProvider>
        </MaterialUIControllerProvider>
      </BrowserRouter>
    );

    // Check if important elements are present
    expect(screen.getByText("Rate our Newspaper Advertisement Analyzer")).toBeInTheDocument();
    expect(screen.getByText("Your Comment is extremely valuable to us")).toBeInTheDocument();
    expect(screen.getByText("Submit Feedback")).toBeInTheDocument();
  });

  test("handles rating change", () => {
    render(
      <BrowserRouter>
        <MaterialUIControllerProvider>
          <UserProvider>
            <ThemeProvider theme={theme}>
              <FeedbackSection />
            </ThemeProvider>
          </UserProvider>
        </MaterialUIControllerProvider>
      </BrowserRouter>
    );
    const ratingStars = screen.getAllByText("★"); // Find all the star icons

    fireEvent.click(ratingStars[2]); // Click the third star

    expect(ratingStars[2]).toHaveStyle("color: orange");
  });

  test("handles feedback input", () => {
    render(
      <BrowserRouter>
        <MaterialUIControllerProvider>
          <UserProvider>
            <ThemeProvider theme={theme}>
              <FeedbackSection />
            </ThemeProvider>
          </UserProvider>
        </MaterialUIControllerProvider>
      </BrowserRouter>
    );
    const feedbackInput = screen.getByPlaceholderText("Your comments...");

    fireEvent.change(feedbackInput, { target: { value: "This is my feedback." } });

    expect(feedbackInput).toHaveValue("This is my feedback.");
  });

  test("handles publish checkbox", () => {
    render(
      <BrowserRouter>
        <MaterialUIControllerProvider>
          <UserProvider>
            <ThemeProvider theme={theme}>
              <FeedbackSection />
            </ThemeProvider>
          </UserProvider>
        </MaterialUIControllerProvider>
      </BrowserRouter>
    );
    const publishCheckbox = screen.getByLabelText(
      "We value your privacy. Check the box if you like to publish your feedback"
    );

    fireEvent.click(publishCheckbox);

    expect(publishCheckbox).toBeChecked();
  });

  test("submits feedback", () => {
    render(
      <BrowserRouter>
        <MaterialUIControllerProvider>
          <UserProvider>
            <ThemeProvider theme={theme}>
              <FeedbackSection />
            </ThemeProvider>
          </UserProvider>
        </MaterialUIControllerProvider>
      </BrowserRouter>
    );
    const submitButton = screen.getByText("Submit Feedback");
    const feedbackInput = screen.getByPlaceholderText("Your comments...");

    // Simulate user interactions
    fireEvent.click(screen.getAllByText("★")[4]); // Click the fifth star
    fireEvent.change(feedbackInput, { target: { value: "Great experience!" } });
    fireEvent.click(
      screen.getByLabelText(
        "We value your privacy. Check the box if you like to publish your feedback"
      )
    );
    fireEvent.click(submitButton);

    //   Add your assertions here for what should happen after submitting feedback
  });
});

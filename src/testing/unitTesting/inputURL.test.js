import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import InputURL from "../../layouts/upload/inputURL";

const mockUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUsedNavigate,
}));

test("User can enter a URL and submit the form", async () => {
  render(<InputURL />);

  const input = screen.getByLabelText("Enter URL");
  const submitButton = screen.getByText("Analyze");

  fireEvent.change(input, {
    target: { value: "https://www.hitad.lk/en/ad/1776799-Thalawathugoda-Land-For-Sale?type=lands" },
  });
  fireEvent.click(submitButton);

  // Wait for loading state to disappear
  await waitFor(() => {
    expect(screen.queryByText("Analyzing...")).toBeNull();
  });

  // Assert that the result is displayed
  expect(screen.getByText("Title: Example Title")).toBeInTheDocument();
});

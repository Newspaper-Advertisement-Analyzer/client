import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import InputURL from "layouts/upload/inputURL";

const server = setupServer(
  rest.post("/api/sendUrlToBackend", (req, res, ctx) => {
    return res(
      ctx.json({
        results: [
          "Example Title",
          "Example Text",
          "Example Summary",
          [],
          "Example Category",
          "Example Price",
          "Example Contact",
          [],
        ],
      })
    );
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

test("User can enter a URL and see the API response", async () => {
  render(<InputURL />);

  const input = screen.getByLabelText("Enter URL");
  const submitButton = screen.getByText("Analyze");

  fireEvent.change(input, { target: { value: "https://example.com" } });
  fireEvent.click(submitButton);

  // Wait for loading state to disappear
  await waitFor(() => {
    expect(screen.queryByText("Analyzing...")).toBeNull();
  });

  // Assert that the result is displayed
  expect(screen.getByText("Title: Example Title")).toBeInTheDocument();
});

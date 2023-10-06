import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; // Use @testing-library/react // Import extend-expect to enable toBeInTheDocument
import Basic from "layouts/authentication/sign-in";
import Test from "./test";
import UserProvider from "utils/userContext";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { MaterialUIControllerProvider } from "context";
import theme from "assets/theme";
import themeDark from "assets/theme-dark";
import { ThemeProvider } from "@mui/material/styles";
import { useUser } from "utils/userContext";

it("renders welcome message", () => {
  const component = render(<Test />);
  const t = screen.getByText("Still in progress of Implementation");
  expect(t).toBeTruthy();
  //   expect(screen.getByText("Still in progress of Implementation")).toBeInTheDocument();
});

describe("Test Login", () => {
  test("render login", async () => {
    render(
      <BrowserRouter>
        <MaterialUIControllerProvider>
          <UserProvider>
            <ThemeProvider theme={theme}>
              <Basic />
            </ThemeProvider>
          </UserProvider>
        </MaterialUIControllerProvider>
      </BrowserRouter>
    );
    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(2);
  });
  test("allows the user to input email and password", () => {
    render(
      <BrowserRouter>
        <MaterialUIControllerProvider>
          <UserProvider>
            <ThemeProvider theme={theme}>
              <Basic />
            </ThemeProvider>
          </UserProvider>
        </MaterialUIControllerProvider>
      </BrowserRouter>
    );

    // Simulate user input
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    userEvent.type(emailInput, "user@example.com");
    userEvent.type(passwordInput, "password123");
    expect(screen.getByText("Welcome Back")).toBeInTheDocument();

    // Check if the email and password input fields are rendered
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();

    // Check if the "Remember me" switch is rendered
    expect(screen.getByText("Remember me")).toBeInTheDocument();

    // Check if the "Forget Password?" link is rendered
    expect(screen.getByText("Forget Password ?")).toBeInTheDocument();

    // Check if the "Log in" button is rendered
    expect(screen.getByText("Log in")).toBeInTheDocument();

    // Check if the "Or" text is rendered
    expect(screen.getByText("Or")).toBeInTheDocument();

    // Check if the "Sign up" link is rendered
    expect(screen.getByText("Sign up")).toBeInTheDocument();

    // Check that the input values are correctly updated
    // expect(emailInput).toHaveValue("user@example.com");
    // expect(passwordInput).toHaveValue("password123");
  });
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("Sign In Page", () => {
  it("handles login correctly", () => {
    render(
      <MemoryRouter>
        <MaterialUIControllerProvider>
          <UserProvider>
            <ThemeProvider theme={theme}>
              <Basic />
            </ThemeProvider>
          </UserProvider>
        </MaterialUIControllerProvider>
      </MemoryRouter>
    );

    // Mock the fetch function to handle the login request
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            user: {
              User_Name: "testuser",
              Full_Name: "Test User",
              UserID: 123,
              Role: "user",
              email: "test@example.com",
              Contact_Number: "1234567890",
              Profession: "Tester",
            },
          }),
      })
    );

    // Fill in the email and password fields
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    // Click the "Log in" button
    fireEvent.click(screen.getByText("Log in"));

    // Check if the login function was called with the correct user data
    expect(useUser().login).toHaveBeenCalledWith({
      name: "test@example.com",
      full_name: "Test User",
      user_ID: 123,
      role: "user",
      email: "test@example.com",
      phone_Number: "1234567890",
      profession: "Tester",
    });
  });
});

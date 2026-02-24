import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "./LoginForm";
import { BrowserRouter } from "react-router";

describe("LoginForm", () => {
  const mockRegister = vi.fn();
  const mockHandleSubmit = vi.fn((fn) => fn);
  const mockOnSubmit = vi.fn();
  const mockErrors = {};
  const mockIsLoading = false;

  beforeEach(() => {
    render(
      <BrowserRouter>
        <LoginForm
          register={mockRegister}
          handleSubmit={mockHandleSubmit}
          onSubmit={mockOnSubmit}
          errors={mockErrors}
          isLoading={mockIsLoading}
        />
      </BrowserRouter>,
    );
  });

  it("should render the login form heading", () => {
    const heading = screen.getByText(/sign in to your account/i);
    expect(heading).toBeInTheDocument();
  });

  it("should render basic form fields", () => {
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const rememberMeCheckbox = screen.getByLabelText(/remember me/i);
    const submitButton = screen.getByRole("button", { name: /login/i });
    const forgotPasswordButton = screen.getByRole("button", {
      name: /forgot password/i,
    });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(rememberMeCheckbox).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(forgotPasswordButton).toBeInTheDocument();
  });

  it("should call onSubmit once on form submission", async () => {
    const user = userEvent.setup();
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it("should render sign up link", () => {
    const signUpLink = screen.getByRole("link", { name: /sign up/i });
    expect(signUpLink).toBeInTheDocument();
  });
});

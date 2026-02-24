import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import RegisterForm from "./RegisterForm";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router";

describe("RegisterForm", () => {
  const mockRegister = vi.fn();
  const mockHandleSubmit = vi.fn((fn) => fn);
  const mockOnSubmit = vi.fn();
  const mockErrors = {};
  const isLoading = false;

  beforeEach(() => {
    render(
      <BrowserRouter>
        <RegisterForm
          register={mockRegister}
          onSubmit={mockOnSubmit}
          handleSubmit={mockHandleSubmit}
          errors={mockErrors}
          isLoading={isLoading}
        />
        ,
      </BrowserRouter>,
    );
  });

  it("should render the register form heading", () => {
    const heading = screen.getByText(/sign up for an account/i);
    expect(heading).toBeInTheDocument();
  });

  it("should render basic form field", () => {
    const emailInput = screen.getByPlaceholderText(/email/i);
    const name = screen.getByPlaceholderText(/name/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    expect(emailInput).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it("should call onSubmit once on form submission", async () => {
    const user = userEvent.setup();
    const submitButton = screen.getByRole("button", { name: /register/i });
    const emailInput = screen.getByPlaceholderText(/email/i);
    const name = screen.getByPlaceholderText(/name/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    await user.type(emailInput, "test@example.com");
    await user.type(name, "test");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it("should render sign in link", () => {
    const signInLink = screen.getByRole("link", { name: /sign in/i });
    expect(signInLink).toBeInTheDocument();
  });
});

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SignInToast } from "./SignInToast";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
  })
) as jest.Mock;

describe("SignInToast", () => {
  const mockSetLoggedIn = jest.fn();

  const renderComponent = () => {
    render(<SignInToast setLoggedIn={mockSetLoggedIn} />);
  };

  it("renders correctly", () => {
    renderComponent();
    expect(screen.getByText("SIGN IN TO YOUR ACCOUNT")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login Now" })).toBeDisabled();
  });

  describe("email validation", () => {
    describe("when email is invalid", () => {
      it("displays an error message", () => {
        renderComponent();

        const emailInput = screen.getByPlaceholderText("Username");

        fireEvent.change(emailInput, { target: { value: "invalid-email" } });

        expect(screen.getByText("Invalid email")).toBeInTheDocument();
      });
    });

    describe("when email is valid", () => {
      it("does not displays an error message", () => {
        renderComponent();

        const emailInput = screen.getByPlaceholderText("Username");

        fireEvent.change(emailInput, {
          target: { value: "validEmail@gmail.com" },
        });

        expect(screen.queryByText("Invalid email")).not.toBeInTheDocument();
      });
    });
  });

  describe("password validation", () => {
    describe("when password is invalid", () => {
      it("displays an error message", () => {
        renderComponent();

        const passwordInput = screen.getByPlaceholderText("Password");

        fireEvent.change(passwordInput, {
          target: { value: "invalid-password" },
        });

        expect(
          screen.getByText(
            "Password should have minimum 6 characters, at least one letter and one digit"
          )
        ).toBeInTheDocument();
      });
    });

    describe("when password is valid", () => {
      it("does not displays an error message", () => {
        renderComponent();

        const passwordInput = screen.getByPlaceholderText("Username");

        fireEvent.change(passwordInput, {
          target: { value: "validPassword1" },
        });

        expect(
          screen.queryByText(
            "Password should have minimum 6 characters, at least one letter and one digit"
          )
        ).not.toBeInTheDocument();
      });
    });
  });

  describe("Login button", () => {
    describe("when email and password are valid", () => {
      it("enables the button", () => {
        renderComponent();

        const emailInput = screen.getByPlaceholderText("Username");
        const passwordInput = screen.getByPlaceholderText("Password");

        fireEvent.change(emailInput, {
          target: { value: "validEmail@gmail.com" },
        });

        fireEvent.change(passwordInput, {
          target: { value: "validPassword1" },
        });

        expect(
          screen.getByRole("button", { name: "Login Now" })
        ).not.toBeDisabled();
      });
    });

    describe("when email is invalid", () => {
      it("disables the button", () => {
        renderComponent();

        const emailInput = screen.getByPlaceholderText("Username");
        const passwordInput = screen.getByPlaceholderText("Password");

        fireEvent.change(emailInput, {
          target: { value: "invalidEmail" },
        });
        fireEvent.change(passwordInput, {
          target: { value: "validPassword1" },
        });

        expect(
          screen.getByRole("button", { name: "Login Now" })
        ).toBeDisabled();
      });
    });

    describe("when password is invalid", () => {
      it("disables the button", () => {
        renderComponent();

        const emailInput = screen.getByPlaceholderText("Username");
        const passwordInput = screen.getByPlaceholderText("Password");

        fireEvent.change(emailInput, {
          target: { value: "validEmail@gmail.com" },
        });
        fireEvent.change(passwordInput, {
          target: { value: "invalidPassword" },
        });

        expect(
          screen.getByRole("button", { name: "Login Now" })
        ).toBeDisabled();
      });
    });
  });

  describe("Form", () => {
    it("loads email from localStorage on mount", () => {
      localStorage.setItem("email", "saved@example.com");

      renderComponent();

      const emailInput = screen.getByPlaceholderText(
        "Username"
      ) as HTMLInputElement;
      expect(emailInput.value).toBe("saved@example.com");
    });

    describe("when the form is submitted", () => {
      describe("with correct values", () => {
        it("submits the form with valid credentials and sets the Logged In state as 'true' ", async () => {
          renderComponent();

          const emailInput = screen.getByPlaceholderText("Username");
          const passwordInput = screen.getByPlaceholderText("Password");
          const submitButton = screen.getByRole("button", {
            name: "Login Now",
          });

          fireEvent.change(emailInput, {
            target: { value: "hello@edited.com" },
          });
          fireEvent.change(passwordInput, { target: { value: "hello123" } });
          fireEvent.click(submitButton);

          await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith("/api/login", {
              method: "POST",
              body: JSON.stringify({
                email: "hello@edited.com",
                password: "hello123",
              }),
            });
            expect(mockSetLoggedIn).toHaveBeenCalledWith(true);
          });
        });

        it('remembers email when "Remember Me" is checked', async () => {
          renderComponent();

          const emailInput = screen.getByPlaceholderText("Username");
          const passwordInput = screen.getByPlaceholderText("Password");
          const rememberMeCheckbox = screen.getByRole("checkbox", {
            name: "Remember me",
          });
          const submitButton = screen.getByRole("button", {
            name: "Login Now",
          });

          fireEvent.change(emailInput, {
            target: { value: "test@example.com" },
          });
          fireEvent.change(passwordInput, { target: { value: "password123" } });
          fireEvent.click(rememberMeCheckbox);
          fireEvent.click(submitButton);

          await waitFor(() => {
            expect(localStorage.getItem("email")).toBe("test@example.com");
          });
        });
      });

      describe("with incorrect values", () => {
        it("shows an alert ", async () => {
          (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({
              ok: false,
            })
          );

          const alertMock = jest
            .spyOn(window, "alert")
            .mockImplementation(() => {});

          renderComponent();

          const emailInput = screen.getByPlaceholderText("Username");
          const passwordInput = screen.getByPlaceholderText("Password");
          const submitButton = screen.getByRole("button", {
            name: "Login Now",
          });

          fireEvent.change(emailInput, {
            target: { value: "invalid@edited.com" },
          });
          fireEvent.change(passwordInput, { target: { value: "invalid123" } });
          fireEvent.click(submitButton);

          await waitFor(() => {
            expect(alertMock).toHaveBeenCalledWith("Invalid email or password");
          });
        });
      });

      it("shows loading state when submitting", async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(
          () =>
            new Promise((resolve) =>
              setTimeout(() => resolve({ ok: true }), 100)
            )
        );

        renderComponent();

        const emailInput = screen.getByPlaceholderText("Username");
        const passwordInput = screen.getByPlaceholderText("Password");
        const submitButton = screen.getByRole("button", { name: "Login Now" });

        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.click(submitButton);

        expect(await screen.findByText("Loading")).toBeInTheDocument();

        await waitFor(() => {
          expect(screen.queryByText("Loading")).not.toBeInTheDocument();
        });
      });
    });
  });
});

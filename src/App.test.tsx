import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

// Mock child components
jest.mock("./components/SignInToast/SignInToast", () => ({
  SignInToast: ({
    setLoggedIn,
  }: {
    setLoggedIn: (loggedIn: boolean) => void;
  }) => (
    <div data-testid="sign-in-toast">
      <button onClick={() => setLoggedIn(true)}>Login now</button>
    </div>
  ),
}));

jest.mock("./components/LoggedInToast/LoggedInToast", () => ({
  LoggedInToast: ({
    setLoggedIn,
  }: {
    setLoggedIn: (loggedIn: boolean) => void;
  }) => (
    <div data-testid="logged-in-toast">
      LoggedInToast
      <button onClick={() => setLoggedIn(false)}>Log Out</button>
    </div>
  ),
}));

describe("App", () => {
  const renderComponent = () => {
    render(<App />);
  };

  it("initially renders SignInToast", () => {
    renderComponent();
    expect(screen.getByTestId("sign-in-toast")).toBeInTheDocument();
    expect(screen.queryByTestId("logged-in-toast")).not.toBeInTheDocument();
  });

  it("switches to LoggedInToast when signed in", () => {
    renderComponent();
    const signInButton = screen.getByText("Login now");
    fireEvent.click(signInButton);

    expect(screen.getByTestId("logged-in-toast")).toBeInTheDocument();
    expect(screen.queryByTestId("sign-in-toast")).not.toBeInTheDocument();
  });

  it("switches back to SignInToast when logged out", () => {
    renderComponent();
    const signInButton = screen.getByText("Login now");
    fireEvent.click(signInButton);

    const logOutButton = screen.getByText("Log Out");
    fireEvent.click(logOutButton);

    expect(screen.getByTestId("sign-in-toast")).toBeInTheDocument();
    expect(screen.queryByTestId("logged-in-toast")).not.toBeInTheDocument();
  });
});

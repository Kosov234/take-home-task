import { render, screen, fireEvent } from "@testing-library/react";
import { LoggedInToast } from "./LoggedInToast";

describe("LoggedInToast", () => {
  const mockSetLoggedIn = jest.fn();

  const renderComponent = () => {
    render(
      <LoggedInToast
        setLoggedInUser={mockSetLoggedIn}
        loggedInUser="saved@example.com"
      />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the logged in message", () => {
    renderComponent();

    expect(screen.getByText("Hi, saved@example.com")).toBeInTheDocument();
  });

  it("renders the logout link", () => {
    renderComponent();

    const logoutLink = screen.getByText("Logout");
    expect(logoutLink).toBeInTheDocument();
  });

  it("calls setLoggedIn with false when logout link is clicked", () => {
    renderComponent();

    const logoutLink = screen.getByText("Logout");
    fireEvent.click(logoutLink);

    expect(mockSetLoggedIn).toHaveBeenCalledWith("");
  });
});

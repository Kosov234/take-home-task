import { MouseEventHandler } from "react";
import "./LogInButton.css";

type LogInButtonProps = {
  isDisabled: boolean;
  handleClick: MouseEventHandler<HTMLButtonElement>;
};

export const LogInButton = ({ isDisabled, handleClick }: LogInButtonProps) => {
  return (
    <div className="LogInButton-Wrapper">
      <button type="submit" onClick={handleClick} disabled={isDisabled}>
        Login Now
      </button>
    </div>
  );
};

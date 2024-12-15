import { MouseEventHandler, useEffect, useState } from "react";
import { LogInButton } from "./components/LogInButton/LogInButton";
import { RememberMeCheckbox } from "./components/RememberMeCheckbox/RememberMeCheckbox";
import { StylizedInput } from "./components/StylizedInput/StylizedInput";
import { emailRegex, passwordRegex } from "./constants";
import "./SignInToast.css";

type SignInToastProps = {
  setLoggedInUser: (loggedIn: string) => void;
};

export const SignInToast = ({ setLoggedInUser }: SignInToastProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRememberMeChecked, setIsRememberMeChecked] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("email");

    if (email) {
      setEmail(email);
    }
  }, []);

  useEffect(() => {
    if (emailRegex.test(email) && passwordRegex.test(password)) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [email, password]);

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    setLoading(true);

    await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }).then((response) => {
      if (response.ok) {
        if (isRememberMeChecked) {
          localStorage.setItem("email", email);
        }
        setLoggedInUser(email);
        setLoading(false);
      } else {
        window.alert("Invalid email or password");
        setLoading(false);
      }
    });
  };

  return (
    <div className="SignInToast-Wrapper">
      {loading ? (
        <h1 className="SignInToast-Title">Loading</h1>
      ) : (
        <>
          <h1 className="SignInToast-Title">SIGN IN TO YOUR ACCOUNT</h1>

          <form className="SignInToast-Form">
            <div className="SignInToast-FormContent">
              <StylizedInput
                value={email}
                setValue={setEmail}
                validationRegex={emailRegex}
                errorText="Invalid email"
                type="email"
                name="email"
                placeholder="Username"
              />
              <StylizedInput
                value={password}
                setValue={setPassword}
                validationRegex={passwordRegex}
                errorText="Password should have minimum 6 characters, at least one letter and one digit"
                type="password"
                name="password"
                placeholder="Password"
              />
              <RememberMeCheckbox
                isChecked={isRememberMeChecked}
                setIsChecked={setIsRememberMeChecked}
              />
            </div>

            <LogInButton
              isDisabled={isSubmitDisabled}
              handleClick={handleSubmit}
            />
          </form>
        </>
      )}
    </div>
  );
};

import "./LoggedInToast.css";

type LoggedInToastProps = {
  setLoggedIn: (loggedIn: boolean) => void;
};

export const LoggedInToast = ({ setLoggedIn }: LoggedInToastProps) => {
  return (
    <div className="LoggedInToast-Wrapper">
      <h1>{`Hi, ${localStorage.getItem("email")}`}</h1>
      <a className="LoggedInToast-Link" onClick={() => setLoggedIn(false)}>
        Logout
      </a>
    </div>
  );
};

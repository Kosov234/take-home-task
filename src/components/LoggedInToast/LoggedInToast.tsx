import "./LoggedInToast.css";

export type LoggedInToastProps = {
  setLoggedInUser: (loggedIn: string) => void;
  loggedInUser: string;
};

export const LoggedInToast = ({
  setLoggedInUser,
  loggedInUser,
}: LoggedInToastProps) => {
  return (
    <div className="LoggedInToast-Wrapper">
      <h1>{`Hi, ${loggedInUser}`}</h1>
      <a className="LoggedInToast-Link" onClick={() => setLoggedInUser("")}>
        Logout
      </a>
    </div>
  );
};

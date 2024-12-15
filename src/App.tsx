import { useState } from "react";
import { SignInToast } from "./components/SignInToast/SignInToast";
import { LoggedInToast } from "./components/LoggedInToast/LoggedInToast";
import "./App.css";

function App() {
  const [loggedInUser, setLoggedInUser] = useState("");

  return (
    <div className="AppWrapper">
      {loggedInUser ? (
        <LoggedInToast
          setLoggedInUser={setLoggedInUser}
          loggedInUser={loggedInUser}
        />
      ) : (
        <SignInToast setLoggedInUser={setLoggedInUser} />
      )}
    </div>
  );
}

export default App;

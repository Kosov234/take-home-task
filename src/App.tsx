import { useState } from "react";
import { SignInToast } from "./components/SignInToast/SignInToast";
import { LoggedInToast } from "./components/LoggedInToast/LoggedInToast";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="AppWrapper">
      {loggedIn ? (
        <LoggedInToast setLoggedIn={setLoggedIn} />
      ) : (
        <SignInToast setLoggedIn={setLoggedIn} />
      )}
    </div>
  );
}

export default App;

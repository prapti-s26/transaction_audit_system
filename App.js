import React, { useState } from "react";
import Login from "./pages/Login";
import Transfer from "./pages/Transfer";
import History from "./pages/History";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const [reload, setReload] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div className="container">
      <div className="navbar">
        <h1>💸 Transaction Dashboard</h1>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <Transfer refresh={() => setReload(!reload)} />
      <History reload={reload} />
    </div>
  );
}

export default App;

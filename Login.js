import React, { useState } from "react";
import API from "../api";
import Signup from "./Signup";

const Login = ({ onLogin }) => {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    try {
      const res = await API.post("/login", {
        userId: Number(userId),
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      onLogin();
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  if (showSignup) {
    return <Signup goBack={() => setShowSignup(false)} />;
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>🔐 Login</h1>

        <input
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button onClick={handleLogin}>Login</button>

        <p style={{ marginTop: "18px" }}>
          New here?{" "}
          <span
            style={{ color: "#4f46e5", cursor: "pointer" }}
            onClick={() => setShowSignup(true)}
          >
            Create new account
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;

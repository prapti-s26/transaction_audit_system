import React, { useState } from "react";
import API from "../api";

const Signup = ({ goBack }) => {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSignup = async () => {
    setMsg("");

    try {
      await API.post("/signup", {
        userId: Number(userId),
        name,
        email,
        password,
      });

      setMsg("Signup successful. Please login.");
    } catch (err) {
      setMsg(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>📝 Create Account</h1>

        <input placeholder="User ID" value={userId} onChange={e=>setUserId(e.target.value)} />
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />

        <small>Password must be 8+ chars with number & symbol</small>

        {msg && <p style={{ color: "green" }}>{msg}</p>}

        <button onClick={handleSignup}>Sign Up</button>

        <p onClick={goBack} style={{ marginTop: "15px", cursor: "pointer", color: "#4f46e5" }}>
          ← Back to Login
        </p>
      </div>
    </div>
  );
};

export default Signup;

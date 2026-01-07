import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../Services/UserService";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    setError("");
    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      await registerUser({
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
      });

      localStorage.setItem("username", username.trim());
      localStorage.setItem("userEmail", email.trim());
      localStorage.setItem("role", "USER");

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Register</h2>
        {error && <p className="error-text">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
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

        <button onClick={register}>Register</button>
      </div>
    </div>
  );
}

export default Register;

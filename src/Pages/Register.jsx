import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../Services/UserService";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // ✅ ADD
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const register = async () => {
    setError("");

    if (!username || !email || !password || !phoneNumber) {
      setError("All fields are required");
      return;
    }

    try {
      await registerUser({
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
        phoneNumber: phoneNumber.trim(), 
      });

      localStorage.setItem("username", username.trim());
      localStorage.setItem("userEmail", email.trim());
      localStorage.setItem("role", "USER");

      navigate("/");
    } catch (err) {
      setError(err.response?.data || "Registration failed");
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
          type="tel"
          placeholder="Enter 10-digit mobile number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          maxLength={10}
          pattern="[6-9][0-9]{9}"
          required
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

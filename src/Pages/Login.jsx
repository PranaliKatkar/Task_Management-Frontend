import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Services/UserService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    if (!email || !password) return;

    try {
      if (email === "admin" && password === "admin") {
        localStorage.setItem("username", "admin");
        localStorage.setItem("userEmail", "admin@admin.com"); // optional
        localStorage.setItem("role", "ADMIN");
        navigate("/mainPage");
        return;
      }

      const res = await loginUser({ email, password });

      localStorage.setItem("username", res.data.username);
      localStorage.setItem("userEmail", res.data.email);
      localStorage.setItem("role", res.data.role); 

      navigate("/mainPage");
    } catch (err) {
      console.error(err);
      alert("Login failed. Check your credentials.");
    }
  };

  const register = () => navigate("/register");

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Login</h2>

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

        <button onClick={login}>Login</button>
        <button onClick={register}>Register</button>
      </div>
    </div>
  );
}

export default Login;

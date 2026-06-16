import { useState } from "react";
import { login } from "../services/api";
import "./auth.css";

function Login({ setUser, setShowLogin }) {
  const [accountNumber, setAccountNumber] = useState("");
  const [pin, setPin] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (!accountNumber || !pin) {
        alert("Please fill in all fields");
        return;
      }

      const response = await login(accountNumber, pin);
      setUser(response.data);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Invalid Account Number or PIN";
      alert(errorMessage);
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">ATM Login</h1>

        <form onSubmit={handleLogin} className="auth-form">
          <input
            type="text"
            placeholder="Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="auth-input"
            required
          />

          <input
            type="password"
            placeholder="PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="auth-input"
            required
          />

          <button type="submit" className="auth-button">
            Login
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?
          <button
            onClick={() => setShowLogin(false)}
            className="auth-footer-link"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
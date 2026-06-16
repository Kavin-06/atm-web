import { useState } from "react";
import {
  getBalance,
  deposit,
  withdraw,
} from "../services/api";
import "./dashboard.css";

function Dashboard({ user, onLogout }) {
  const [balance, setBalance] = useState(user.balance);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(""), 3000);
  };

  const fetchBalance = async () => {
    try {
      const response = await getBalance(user.accountNumber);
      setBalance(response.data.balance);
      showMessage("Balance updated successfully", "success");
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to fetch balance";
      showMessage(errorMsg, "error");
      console.error(error);
    }
  };

  const handleDeposit = async () => {
    try {
      if (!amount || Number(amount) <= 0) {
        showMessage("Please enter a valid amount", "error");
        return;
      }

      const response = await deposit(user.accountNumber, Number(amount));
      setBalance(response.data.balance);
      setAmount("");
      showMessage(response.data.message || "Deposit successful", "success");
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Deposit failed";
      showMessage(errorMsg, "error");
      console.error(error);
    }
  };

  const handleWithdraw = async () => {
    try {
      if (!amount || Number(amount) <= 0) {
        showMessage("Please enter a valid amount", "error");
        return;
      }

      const response = await withdraw(user.accountNumber, Number(amount));
      setBalance(response.data.balance);
      setAmount("");
      showMessage(response.data.message || "Withdrawal successful", "success");
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Withdrawal failed";
      showMessage(errorMsg, "error");
      console.error(error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Welcome, {user.name}</h1>
          <button onClick={onLogout} className="logout-button">
            Logout
          </button>
        </div>

        <div className="balance-display">
          <p className="balance-label">Current Balance</p>
          <h2 className="balance-amount">₹{balance.toFixed(2)}</h2>
        </div>

        <button onClick={fetchBalance} className="dashboard-button btn-check-balance">
          Check Balance
        </button>

        <div className="dashboard-form">
          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="dashboard-input"
            min="0"
          />

          <div className="button-group">
            <button onClick={handleDeposit} className="dashboard-button btn-deposit">
              Deposit
            </button>
            <button onClick={handleWithdraw} className="dashboard-button btn-withdraw">
              Withdraw
            </button>
          </div>
        </div>

        {message && (
          <div className={`message ${message ? `message-${messageType}` : ""}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
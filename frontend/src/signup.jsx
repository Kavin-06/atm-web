import { useState } from "react";
import { signup } from "../services/api";
import "./auth.css";

function Signup({ setShowLogin }) {
    const [form, setForm] = useState({
        name: "",
        accountNumber: "",
        pin: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSignup = async () => {
        try {
            if (!form.name || !form.accountNumber || !form.pin) {
                alert("Please fill in all fields");
                return;
            }

            const response = await signup(form);
            alert(response.data.message || "Account Created Successfully");
            setShowLogin(true);
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error Creating Account";
            alert(errorMessage);
            console.error(error);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-title">Create Account</h1>

                <div className="auth-form">
                    <input
                        className="auth-input"
                        placeholder="Full Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                    />

                    <input
                        className="auth-input"
                        placeholder="Account Number"
                        name="accountNumber"
                        value={form.accountNumber}
                        onChange={handleChange}
                    />

                    <input
                        className="auth-input"
                        placeholder="PIN (4-6 digits)"
                        type="password"
                        name="pin"
                        value={form.pin}
                        onChange={handleChange}
                    />

                    <button
                        onClick={handleSignup}
                        className="auth-button"
                    >
                        Create Account
                    </button>
                </div>

                <p className="auth-footer">
                    Already have an account?
                    <button
                        className="auth-footer-link"
                        onClick={() => setShowLogin(true)}
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Signup;
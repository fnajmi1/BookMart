import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import backgroundImage from "../assets/background.png";

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "buyer",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phone" && /[^0-9]/.test(value)) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u: any) =>
        u.email === formData.email &&
        u.password === formData.password &&
        u.role === formData.role
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      if (user.role === "seller") {
        navigate("/sellerhome", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }
    } else {
      alert("Invalid credentials or user not registered.");
    }
  };

  const handleSignUp = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = users.some(
      (u: any) => u.email === formData.email && u.role === formData.role
    );

    if (userExists) {
      alert("User already registered with this email and role.");
      return;
    }

    const newUser = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    alert("Signup successful! Please log in.");
    setIsLogin(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    isLogin ? handleLogin() : handleSignUp();
  };

  return (
    <div className="auth-container">
      <div className="auth-overlay" />
      <div className="auth-card">
        <div className="tab-buttons">
          <button className={isLogin ? "active" : ""} onClick={() => setIsLogin(true)}>
            Login
          </button>
          <button className={!isLogin ? "active" : ""} onClick={() => setIsLogin(false)}>
            Sign Up
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                maxLength={10}
                required
              />
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="submit-btn">
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <div className="switch-text">
          {isLogin ? (
            <>
              Don’t have an account? <span onClick={() => setIsLogin(false)}>Sign Up</span>
            </>
          ) : (
            <>
              Already have an account? <span onClick={() => setIsLogin(true)}>Login</span>
            </>
          )}
        </div>

        <div className="switch-role">
          {formData.role === "buyer" ? (
            <p onClick={() => setFormData({ ...formData, role: "seller" })}>
              Are you a Seller? <strong>Switch to Seller</strong>
            </p>
          ) : (
            <p onClick={() => setFormData({ ...formData, role: "buyer" })}>
              Not a Seller? <strong>Switch to Buyer</strong>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

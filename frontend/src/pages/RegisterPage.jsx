import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterPage.css";

export default function RegisterPage() {
  const navigate = useNavigate();
  // 1. State to hold form data
  const [formData, setFormData] = useState({
    username: "", 
    email: "",
    password: "",
    password2: "",
    first_name: "" // Optional but good to have
  });
  const [error, setError] = useState("");

  // 2. Handle typing
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // 3. Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Registration success: Save tokens and redirect
        localStorage.setItem("access_token", data.tokens.access);
        localStorage.setItem("refresh_token", data.tokens.refresh);
        navigate("/chat"); // Redirect to chat after signup
      } else {
        // Handle backend validation errors
        setError(JSON.stringify(data)); 
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-inner">
        <div className="register-card">
          <h1>Create Account</h1>
          {error && <p style={{color: 'red'}}>{error}</p>}
          
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              {/* Added Username field because Django requires it */}
              <input
                type="text"
                id="username"
                placeholder="Choose a username"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Create a password"
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password2">Confirm Password</label>
              <input
                type="password"
                id="password2"
                placeholder="Confirm your password"
                onChange={handleChange}
                required
              />
            </div>
            
            <button type="submit" className="register-button">
              Create Account
            </button>
          </form>
          {/* ... footer links ... */}
        </div>
      </div>
    </div>
  );
}
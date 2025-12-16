import { Link } from "react-router-dom";
import "./RegisterPage.css";

export default function RegisterPage() {
  return (
    <div className="register-container">
      <div className="register-inner">
        <div className="register-card">
          <h1>Create Account</h1>
          <p className="subtitle">Sign up to get started</p>
          
          <form className="register-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Create a password"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                placeholder="Confirm your password"
                required
              />
            </div>
            
            <label className="terms-label">
              <input type="checkbox" required />
              <span>
                I agree to the{" "}
                <Link to="/terms" className="terms-link">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="terms-link">
                  Privacy Policy
                </Link>
              </span>
            </label>
            
            <button type="submit" className="register-button">
              Create Account
            </button>
          </form>
          
          <div className="divider">
            <span>or</span>
          </div>
          
          <p className="login-prompt">
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
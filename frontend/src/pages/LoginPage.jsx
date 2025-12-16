import { Link } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-inner">
        <div className="login-card">
          <h1>Welcome Back</h1>
          <p className="subtitle">Log in to your account</p>
          
          <form className="login-form">
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
                placeholder="Enter your password"
                required
              />
            </div>
            
            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>
            
            <button type="submit" className="login-button">
              Log In
            </button>
          </form>
          
          <div className="divider">
            <span>or</span>
          </div>
          
          <p className="register-prompt">
            Don't have an account?{" "}
            <Link to="/register" className="register-link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
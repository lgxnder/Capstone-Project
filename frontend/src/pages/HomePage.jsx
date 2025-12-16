import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="home-container">
      <div className="home-inner">
        <div className="chat-link-wrapper">
          <Link to="/chat" className="chat-link">
            Open Chatbot
          </Link>
        </div>

        <section className="resources">
          <h2>Resources</h2>
        </section>
      </div>
    </div>
  );
}

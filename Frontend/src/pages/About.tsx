import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/About.css";

export default function About() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/auth");
  };

  return (
    <div className="about-layout no-padding">
      <div className="bookshelf left-shelf"></div>

      <div className="about-page no-box">
        {/* Hero Section */}
        <section className="hero-section no-box">
          <h1 className="hero-heading">
            Bookworm is template for selling books and acquaintance with <br />
            <span className="brand-name">literature world</span>
          </h1>
          <p className="hero-subtext">
            This is a multifunctional template that gives you an opportunity to buy books in
            different formats, learn more about writers and their biography, and keep abreast of
            literary news.
          </p>
          <button className="primary-button" onClick={handleSignIn}>
            Join the Marketplace
          </button>
        </section>

    

        {/* CTA */}
        <section className="cta-section no-box">
          <h2>Ready to Join the Book Revolution?</h2>
          <p>
            Whether you want to clean out your bookshelf or discover your next favorite read —
            BookMart is here for you.
          </p>
          <button className="primary-button" onClick={handleSignIn}>
            Create Your Free Account
          </button>
        </section>

        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} BookMart. All rights reserved.</p>
        </footer>
      </div>

      <div className="bookshelf right-shelf"></div>
    </div>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email.trim()) {
            setMessage("Thank you for subscribing!");
            setEmail("");
        }
    };

    const scrollToStories = (e) => {
        const el = document.getElementById("articles");
        if (el) {
            e.preventDefault();
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="site-footer">
            <div className="footer-wrap footer-main-grid">

                <div className="footer-col footer-col-brand">
                    <Link to="/" className="footer-brand-logo">
                        <span className="brand-mark" aria-hidden="true">d</span>
                        <span>The Daily</span>
                    </Link>
                    <p className="footer-manifesto">
                        A modern blog for curious minds. Thoughtful stories on ideas, culture,
                        design, and everyday life — curated daily.
                    </p>
                    <div className="footer-social-row">
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Twitter">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="GitHub">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="LinkedIn">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.59 1.59 0 1 0 0-3.18 1.59 1.59 0 0 0 0 3.18m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="footer-col">
                    <h4 className="footer-col-title">Quick Links</h4>
                    <ul className="footer-nav-list">
                        <li>
                            <Link to="/stories" onClick={scrollToStories}>All Stories</Link>
                        </li>
                        <li>
                            <a href="#articles" onClick={scrollToStories}>Featured Stories</a>
                        </li>
                        <li>
                            <a href="#newsletter">Subscribe</a>
                        </li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4 className="footer-col-title">Categories</h4>
                    <ul className="footer-nav-list">
                        <li>
                            <Link to="/stories?category=history">History</Link>
                        </li>
                        <li>
                            <Link to="/stories?category=fiction">Fiction</Link>
                        </li>
                        <li>
                            <Link to="/stories?category=crime">Crime</Link>
                        </li>
                        <li>
                            <Link to="/stories?category=magical">Magical</Link>
                        </li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4 className="footer-col-title">Newsletter</h4>
                    <p className="footer-manifesto" style={{ marginBottom: "12px" }}>
                        Get the latest stories sent directly to your inbox.
                    </p>
                    <form onSubmit={handleSubscribe} className="digest-input-group">
                        <input
                            type="email"
                            className="digest-input"
                            placeholder="Your email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit" className="digest-submit-btn">
                            Send
                        </button>
                    </form>
                    {message && <p className="digest-status-msg">{message}</p>}
                </div>
            </div>

            <div className="footer-bottom-bar">
                <div className="footer-wrap bottom-inner">
                    <p className="copyright-line">
                        © {new Date().getFullYear()} The Daily. All rights reserved.
                    </p>
                    <button type="button" className="back-to-top-btn" onClick={scrollToTop}>
                        <span>Back to top</span>
                        <span aria-hidden="true">↑</span>
                    </button>
                </div>
            </div>
        </footer>
    );
}

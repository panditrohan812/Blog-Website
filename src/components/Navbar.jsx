
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const location = useLocation();

    const handleStoriesClick = (e) => {
        if (location.pathname === "/" || location.pathname === "/stories") {
            e.preventDefault();
            const el = document.getElementById("articles");
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
                window.history.pushState(null, "", "/#articles");
            }
        }
    };

    const handleSubscribeClick = (e) => {
        if (location.pathname === "/" || location.pathname === "/stories") {
            e.preventDefault();
            const el = document.getElementById("newsletter");
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
                window.history.pushState(null, "", "/#newsletter");
            }
        }
    };

    return (
        <header className="site-header">
            <nav className="nav-wrap" aria-label="Main navigation">
                <Link to="/" className="brand" aria-label="The Daily home">
                    <span className="brand-mark" aria-hidden="true">d</span>
                    <span>The Daily</span>
                </Link>

                <div className="nav-links">
                    <Link to="/stories" onClick={handleStoriesClick}>Stories</Link>
                    <a className="nav-subscribe" href="/#newsletter" onClick={handleSubscribeClick}>
                        Subscribe <span aria-hidden="true">↗</span>
                    </a>
                </div>
            </nav>
        </header>
    );
}

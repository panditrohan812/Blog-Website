import { Link } from "react-router-dom";
import { getPostImage, getReadingTime } from "../data/blog";

export default function Hero({ post }) {
    return (
        <section className="hero">
            <div className="hero-copy">
                <p className="eyebrow">A journal for curious minds</p>
                <h1>Good stories make us <span>feel more.</span></h1>
                <p className="hero-description">
                    Thoughtful reads on the little things, big ideas, and everything
                    in between. Take a moment, find a story, and stay awhile.
                </p>
                <a
                    className="button-primary"
                    href="#articles"
                    onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("articles")?.scrollIntoView({ behavior: "smooth" });
                        window.history.pushState(null, "", "/#articles");
                    }}
                >
                    Find your next read <span aria-hidden="true">↓</span>
                </a>
                <p className="hero-note">Fresh perspectives, picked for you.</p>
            </div>

            {post ? (
                <Link className="featured-card" to={`/blog/${post.id}`}>
                    <img
                        className="featured-image"
                        src={getPostImage(post)}
                        alt=""
                    />
                    <div className="featured-content">
                        <span className="featured-label">Editor's pick</span>
                        <h2>{post.title}</h2>
                        <p className="featured-meta">
                            The Daily Editors <span aria-hidden="true">·</span> {getReadingTime(post.body)} min read
                        </p>
                    </div>
                </Link>
            ) : (
                <div className="featured-card" aria-label="Featured story loading">
                    <div className="featured-content">
                        <span className="featured-label">Editor's pick</span>
                        <h2>Stories worth slowing down for.</h2>
                    </div>
                </div>
            )}
        </section>
    );
}

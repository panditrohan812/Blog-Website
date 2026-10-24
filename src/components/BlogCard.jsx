import { Link, useNavigate } from "react-router-dom";
import { getPostImage, getReadingTime } from "../data/blog";

export default function BlogCard({ post }) {
    const navigate = useNavigate();
    const category = post.tags?.[0] || "Article";

    const handleCardClick = (e) => {
        if (e.target.closest("a") || e.target.closest("button")) {
            return;
        }
        navigate(`/blog/${post.id}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
            if (e.target === e.currentTarget) {
                e.preventDefault();
                navigate(`/blog/${post.id}`);
            }
        }
    };

    return (
        <article
            className="blog-card"
            onClick={handleCardClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-label={`Read story: ${post.title}`}
        >
            <Link
                className="card-image-link"
                to={`/blog/${post.id}`}
                aria-label={`Read ${post.title}`}
                tabIndex={-1}
            >
                <img
                    src={getPostImage(post)}
                    alt=""
                    className="card-image"
                    loading="lazy"
                />
            </Link>

            <div className="card-content">
                <p className="card-category">{category}</p>
                <h3 className="card-title">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h3>
                <p className="card-excerpt">
                    {post.body.length > 145 ? `${post.body.slice(0, 145).trim()}…` : post.body}
                </p>
                <div className="card-meta">
                    <span>The Daily Editors</span>
                    <span className="card-stats">
                        {getReadingTime(post.body)} min read <span aria-hidden="true">·</span> {post.reactions?.likes ?? 0} likes
                    </span>
                </div>
                <Link className="read-more" to={`/blog/${post.id}`}>
                    Read story <span aria-hidden="true">→</span>
                </Link>
            </div>
        </article>
    );
}

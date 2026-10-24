import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostById } from "../services/api";
import { getPostImage, getReadingTime } from "../data/blog";

export default function BlogDetails() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        async function loadPost() {
            setLoading(true);
            setPost(null);
            setError("");

            try {
                const data = await getPostById(id);

                if (!cancelled) {
                    setPost(data);
                }
            } catch (requestError) {
                if (!cancelled) {
                    setError(
                        requestError.response?.data?.message ||
                        requestError.message ||
                        "Unable to load this story. Please try again."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadPost();

        return () => {
            cancelled = true;
        };
    }, [id]);

    if (loading) {
        return (
            <main className="page-wrap article-page">
                <div className="load-state" role="status">
                    <p>Opening your story…</p>
                </div>
            </main>
        );
    }

    if (error || !post) {
        return (
            <main className="page-wrap article-page">
                <section className="empty-state error-state">
                    <h2>This story is not available.</h2>
                    <p>{error || "It may have moved or no longer be available."}</p>
                    <Link className="button-primary" style={{ marginTop: "20px" }} to="/stories">
                        Back to stories
                    </Link>
                </section>
            </main>
        );
    }

    const paragraphs = post.body.split(/\n{2,}/).filter(Boolean);

    return (
        <main className="page-wrap article-page">
            <Link className="back-link" to="/stories">
                <span aria-hidden="true">←</span> Back to all stories
            </Link>

            <header className="article-header">
                <p className="eyebrow">{post.tags?.join(" · ") || "A story from The Daily"}</p>
                <h1>{post.title}</h1>
                <div className="article-byline">
                    <span>By The Daily Editors</span>
                    <span aria-hidden="true">·</span>
                    <span>{getReadingTime(post.body)} min read</span>
                </div>
            </header>

            <img className="article-cover" src={getPostImage(post)} alt="" />

            <div className="article-stats">
                <span>{post.reactions?.likes ?? 0} readers liked this</span>
                <span>{post.views ?? 0} reads</span>
            </div>

            <article className="article-body">
                {paragraphs.map((paragraph, index) => (
                    <p key={`${post.id}-${index}`}>{paragraph}</p>
                ))}
            </article>

            {post.tags?.length > 0 && (
                <div className="article-tags" aria-label="Story topics">
                    {post.tags.map((tag) => (
                        <span className="article-tag" key={tag}>{tag}</span>
                    ))}
                </div>
            )}
        </main>
    );
}

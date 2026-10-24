import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getPosts, searchPosts } from "../services/api";
import Hero from "../components/Hero";
import BlogCard from "../components/BlogCard";

export default function Home() {
    const location = useLocation();
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [newsletterMessage, setNewsletterMessage] = useState("");

    const loadPosts = async (query = "") => {
        try {
            setLoading(true);
            setError("");

            const data = query.trim()
                ? await searchPosts(query.trim())
                : await getPosts();

            setPosts(data.posts);
            setSelectedCategory("all");
        } catch (requestError) {
            setError(
                requestError.response?.data?.message ||
                requestError.message ||
                "We could not load the stories. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let cancelled = false;

        async function loadInitialPosts() {
            try {
                const data = await getPosts();

                if (!cancelled) {
                    setPosts(data.posts);
                }
            } catch (requestError) {
                if (!cancelled) {
                    setError(
                        requestError.response?.data?.message ||
                        requestError.message ||
                        "We could not load the stories. Please try again."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadInitialPosts();
        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const cat = params.get("category");
        if (cat) {
            setSelectedCategory(cat);
        }
    }, [location.search]);

    useEffect(() => {
        if (!loading && (location.hash === "#articles" || location.pathname === "/stories" || location.search.includes("category="))) {
            const timer = setTimeout(() => {
                const el = document.getElementById("articles");
                if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                }
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [loading, location.hash, location.pathname, location.search]);

    const handleSearch = (event) => {
        event.preventDefault();
        loadPosts(search);
    };

    const handleNewsletterSubmit = (event) => {
        event.preventDefault();
        setNewsletterMessage(
            `Thanks for your interest, ${email}! Email sign-ups are not connected in this demo yet.`
        );
        setEmail("");
    };

    const categories = [...new Set(posts.flatMap((post) => post.tags || []))];
    const filteredPosts = posts.filter((post) => {
        return selectedCategory === "all" || post.tags?.includes(selectedCategory);
    });
    const featuredPost = posts[0];
    const articles = filteredPosts.filter((post) => post.id !== featuredPost?.id);

    return (
        <main className="page-wrap">
            <Hero post={featuredPost} />

            <section id="articles" className="articles-section">
                <div className="section-rule">
                    <h2>Stories to stay for</h2>
                </div>

                <div className="article-toolbar">
                    <p className="article-count">
                        {loading
                            ? "Finding your next read…"
                            : `${filteredPosts.length} ${filteredPosts.length === 1 ? "story" : "stories"} to explore`}
                    </p>

                    <form className="search-form" onSubmit={handleSearch} role="search">
                        <input
                            aria-label="Search stories"
                            className="search-input"
                            type="search"
                            placeholder="Search stories..."
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                        <button className="search-button" type="submit" disabled={loading}>
                            Search
                        </button>
                    </form>
                </div>

                {!loading && !error && categories.length > 0 && (
                    <div className="category-list" aria-label="Filter stories by category">
                        <button
                            className={`category-button ${selectedCategory === "all" ? "is-active" : ""}`}
                            type="button"
                            aria-pressed={selectedCategory === "all"}
                            onClick={() => setSelectedCategory("all")}
                        >
                            All stories
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`category-button ${selectedCategory === category ? "is-active" : ""}`}
                                type="button"
                                aria-pressed={selectedCategory === category}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                )}

                {loading && (
                    <div className="load-state" role="status">
                        <p>Gathering a few good stories for you…</p>
                    </div>
                )}

                {!loading && error && (
                    <div className="load-state error-state" role="alert">
                        <p>{error}</p>
                        <button className="text-button" onClick={() => loadPosts(search)} type="button">
                            Try again
                        </button>
                    </div>
                )}

                {!loading && !error && articles.length === 0 && (
                    <div className="empty-state">
                        <h2>No stories found just yet.</h2>
                        <p>Try another search or choose a different category.</p>
                        <button
                            className="text-button"
                            type="button"
                            onClick={() => {
                                setSearch("");
                                loadPosts();
                            }}
                        >
                            Show all stories
                        </button>
                    </div>
                )}

                {!loading && !error && articles.length > 0 && (
                    <div className="article-grid">
                        {articles.map((post) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                )}
            </section>

            <section id="newsletter" className="newsletter">
                <div>
                    <p className="eyebrow">A good thing in your inbox</p>
                    <h2>Make room for a little wonder.</h2>
                    <p className="newsletter-copy">
                        A thoughtful note and fresh reads, delivered when we have
                        something worth sharing.
                    </p>
                </div>
                <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                    <input
                        className="newsletter-input"
                        type="email"
                        aria-label="Your email address"
                        autoComplete="email"
                        placeholder="Your email address"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                    <button className="button-primary" type="submit">
                        Count me in <span aria-hidden="true">→</span>
                    </button>
                </form>
                {newsletterMessage && (
                    <p className="newsletter-status" role="status">
                        {newsletterMessage}
                    </p>
                )}
            </section>
        </main>
    );
}

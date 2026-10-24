import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import BlogDetails from "./pages/BlogDetails";
import ScrollManager from "./components/ScrollManager";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stories" element={<Home />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route
          path="*"
          element={
            <main className="page-wrap">
              <section className="empty-state" style={{ marginBlock: "72px" }}>
                <h2>This page could not be found.</h2>
                <p>Try heading back to the latest stories.</p>
                <Link className="button-primary" style={{ marginTop: "20px" }} to="/stories">
                  Back to stories
                </Link>
              </section>
            </main>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

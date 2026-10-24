import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollManager() {
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/stories" || location.hash === "#articles") {
            const el = document.getElementById("articles");
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
        } else if (location.hash === "#newsletter") {
            const el = document.getElementById("newsletter");
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [location]);

    return null;
}

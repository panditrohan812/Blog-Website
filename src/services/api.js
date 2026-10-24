
import axios from "axios";

const API_URL = "https://dummyjson.com/posts";

// Axios instance
const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
});

// Get all blog posts
export const getPosts = async () => {
    const response = await api.get("", {
        params: {
            limit: 30,
        },
    });

    return response.data;
};

// Get single blog post
export const getPostById = async (id) => {
    const response = await api.get(`/${id}`);

    return response.data;
};

// Search blog posts
export const searchPosts = async (query) => {
    const response = await api.get("/search", {
        params: {
            q: query,
        },
    });

    return response.data;
};

export default api;

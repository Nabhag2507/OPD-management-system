const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const buildUrl = (path) => `${API_BASE_URL}${path}`;

const readJson = async (response) => {
    const text = await response.text();
    return text ? JSON.parse(text) : {};
};

export const apiRequest = async (path, options = {}) => {
    const token = localStorage.getItem("token");
    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(buildUrl(path), {
        ...options,
        headers,
    });

    const data = await readJson(response);

    if (!response.ok) {
        throw new Error(data.message || "Request failed");
    }

    return data;
};

export default API_BASE_URL;

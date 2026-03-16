import { apiRequest } from "./api";

const normalizeRole = (role) => (role || "").toUpperCase();
const toBackendRole = (role) => (role || "").toLowerCase();

const mapAuthResponse = (data) => {
    const user = data.user
        ? {
            ...data.user,
            role: normalizeRole(data.user.role),
        }
        : null;

    if (data.err || !user) {
        throw new Error(data.message || "Authentication failed");
    }

    return {
        success: true,
        token: data.token || null,
        user,
        message: data.message,
    };
};

export const authService = {
    login: async (email, password) => {
        const data = await apiRequest("/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });

        return mapAuthResponse(data);
    },

    signup: async ({ email, password, role, name }) => {
        const data = await apiRequest("/auth/signup", {
            method: "POST",
            body: JSON.stringify({
                email: email.trim(),
                password,
                name: name.trim(),
                role: toBackendRole(role),
            }),
        });

        return mapAuthResponse(data);
    },

    logout: async () => ({ success: true }),
};

export default authService;

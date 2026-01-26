// Mock Authentication Service
const API_BASE_URL = "https://jsonplaceholder.typicode.com"; // Free API for demo

export const authService = {
  login: async (email, password, role) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          user: {
            id: 1,
            email,
            role,
            name: role === "ADMIN" ? "Admin User" : role === "DOCTOR" ? "Dr. Smith" : role === "RECEPTIONIST" ? "John Receptionist" : "Patient User"
          },
          token: "mock_token_" + Date.now()
        });
      }, 500);
    });
  },

  signup: async (email, password, role, name) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          user: { id: Math.random(), email, role, name },
          token: "mock_token_" + Date.now()
        });
      }, 500);
    });
  },

  logout: async () => {
    return { success: true };
  }
};

export default authService;

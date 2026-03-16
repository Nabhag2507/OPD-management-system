import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/useAuth";
import authService from "../services/authService";

const Signup = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        role: "",
        name: "",
        email: "",
        password: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);

        try {
            const response = await authService.signup(formData);
            login(response.user, response.token);

            if (response.user.role === "ADMIN") navigate("/admin");
            if (response.user.role === "DOCTOR") navigate("/doctor");
            if (response.user.role === "RECEPTIONIST") navigate("/receptionist");
            if (response.user.role === "PATIENT") navigate("/patient");
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card slide-in">
                <h2 className="auth-title">Create your account</h2>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <label>
                        Role
                        <select name="role" value={formData.role} onChange={handleChange} required>
                            <option value="">Select role</option>
                            <option value="ADMIN">Admin</option>
                            <option value="DOCTOR">Doctor</option>
                            <option value="RECEPTIONIST">Receptionist</option>
                            <option value="PATIENT">Patient</option>
                        </select>
                    </label>

                    <label>
                        Full name
                        <input
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Email
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Password
                        <input
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    {error && <p className="form-error">{error}</p>}

                    <button type="submit" className="btn-gradient full" disabled={submitting}>
                        {submitting ? "Creating account..." : "Sign up"}
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account?{" "}
                    <Link to="/login" className="auth-link">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;

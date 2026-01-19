import { Link } from "react-router-dom";

const Signup = () => {
    return (
        <div className="auth-page">
            <div className="auth-card slide-in">
                <h2 className="auth-title">Create your account</h2>

                <form className="auth-form">
                    <label>
                        Role
                        <select>
                            <option value="">Select role</option>
                            <option value="ADMIN">Admin</option>
                            <option value="DOCTOR">Doctor</option>
                            <option value="RECEPTIONIST">Receptionist</option>
                            <option value="PATIENT">Patient</option>
                        </select>
                    </label>

                    <label>
                        Full name
                        <input type="text" placeholder="John Doe" />
                    </label>

                    <label>
                        Email
                        <input type="email" placeholder="you@example.com" />
                    </label>

                    <label>
                        Password
                        <input type="password" placeholder="••••••••" />
                    </label>

                    <button type="button" className="btn-gradient full">
                        Sign up
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

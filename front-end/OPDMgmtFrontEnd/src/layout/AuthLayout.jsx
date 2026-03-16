import { Outlet, Link } from "react-router-dom";

const AuthLayout = () => {
    return (
        <>
            <header className="auth-header">
                <Link to="/" className="auth-back">
                    Back to home
                </Link>
            </header>

            <Outlet />
        </>
    );
};

export default AuthLayout;

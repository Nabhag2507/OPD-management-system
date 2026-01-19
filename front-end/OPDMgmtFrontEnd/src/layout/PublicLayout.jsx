import { Outlet, Link } from "react-router-dom";

const PublicLayout = () => {
    return (
        <div className="public-root">
            <header className="public-header">
                <div className="logo">MediCore</div>

                <div className="auth-buttons">
                    <Link to="/login" className="btn ghost">Login</Link>
                    <Link to="/signup" className="btn solid">Sign up</Link>
                </div>
            </header>

            <Outlet />
        </div>
    );
};

export default PublicLayout;

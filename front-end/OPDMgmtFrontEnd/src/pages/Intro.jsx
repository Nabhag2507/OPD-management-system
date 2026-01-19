import { Link } from "react-router-dom";

const Intro = () => {
    return (
        <main className="intro-root">
            <section className="intro-hero slide-in">
                <h1 className="intro-title">
                    Hospital management,
                    <br />
                    <span>done right.</span>
                </h1>

                <p className="intro-subtitle">
                    A modern platform to manage hospitals, doctors, patients,
                    OPD workflows, and billing — securely and efficiently.
                </p>

                {/* 🔥 MAIN CTA BUTTONS */}
                <div className="intro-cta">
                    <Link to="/signup" className="btn-gradient">
                        Get started
                    </Link>

                    <Link to="/login" className="btn-secondary">
                        Sign in
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default Intro;

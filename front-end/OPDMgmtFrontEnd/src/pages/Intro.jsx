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
                    A calm workspace to manage hospitals, doctors, patients,
                    OPD workflows, and billing in one connected system.
                </p>

                <div className="intro-cta">
                    <Link to="/signup" className="btn-gradient">
                        Get started
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default Intro;

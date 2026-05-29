import { Link } from "react-router-dom";

import { useAuth } from "@/context/useAuth";
import { UserNav } from "@/components/Layout/UserNav";

import css from "./Navbar.module.scss";

export default function Navbar() {
    const { token } = useAuth();

    return (
        <header className={css.header}>
            <nav className={css.nav}>
                <div className={css.left}>
                    <Link to="/" className={css.logoLink} aria-label="Go to home">
                        <img
                            src="/crownwhite.svg"
                            alt="crown"
                            className={css.logo}
                            draggable={false}
                        />
                    </Link>

                    <Link to="/quizzes/browse" className={css.browseLink}>
                        Browse quizzes
                        <span aria-hidden className={css.arrow}>
                            ▸
                        </span>
                    </Link>
                </div>

                <div className={css.right}>
                    <a
                        href="https://github.com/Sjors-Hoogenboom"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className={css.iconButton}
                    >
                        <img src="/github.svg" alt="" />
                    </a>
                    {token ? (
                        <UserNav />
                    ) : (
                        <>
                            <Link to="/login" className={css.ghostButton}>
                                Sign in
                            </Link>
                            <Link to="/signup" className={css.primaryButton}>
                                Sign up
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}

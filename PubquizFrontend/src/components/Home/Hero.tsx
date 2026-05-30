import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "@/context/useAuth";

import css from "./Hero.module.scss";

type HeroProps = {
    onViewFeatures: () => void;
};

export default function Hero({ onViewFeatures }: HeroProps) {
    const { user } = useAuth();
    const [joinCode, setJoinCode] = useState("");
    const navigate = useNavigate();

    const name = user?.displayName;

    const handleJoinQuiz = () => {
        const codeToUpper = joinCode.trim().toUpperCase();

        if (!codeToUpper) {
            return;
        }

        navigate(`/play/${codeToUpper}`);
    };

    return (
        <section className={css.hero}>
            <h1 className={css.title}>
                {user ? (
                    <span className={css.gradientText}>Welcome, {name}</span>
                ) : (
                    "Pubquizzz maker"
                )}
            </h1>

            <p className={css.description}>
                {user
                    ? "Ready to make or play a quiz?"
                    : "Create and host your own pubquizzes easily. Check the latest quizzes and start playing today."}
            </p>

            <div className={css.actions}>
                <Link to="/quizzes/browse" className={css.primaryButton}>
                    Get started
                </Link>

                <button
                    type="button"
                    className={css.outlineButton}
                    onClick={onViewFeatures}
                >
                    View features
                </button>
            </div>

            <div className={css.joinContainer}>
                {user ? (
                    <div className={css.joinForm}>
                        <input
                            type="text"
                            placeholder="Enter quiz code..."
                            value={joinCode}
                            onChange={(event) => setJoinCode(event.target.value)}
                            className={css.joinInput}
                        />

                        <button
                            type="button"
                            className={css.joinButton}
                            onClick={handleJoinQuiz}
                        >
                            Join quiz
                        </button>
                    </div>
                ) : (
                    <Link to="/login" className={css.loginButton}>
                        Login
                    </Link>
                )}
            </div>
        </section>
    );
}
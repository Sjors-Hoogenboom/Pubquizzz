import { type SubmitEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginApi } from "@/api/http";
import { useAuth } from "@/context/useAuth";

import css from "./Login.module.scss";

export default function LoginForm() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const data = await loginApi({ email, password });
            login(data.accessToken);
            navigate("/");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={onSubmit} className={css.form}>
            <div className={css.header}>
                <a href="/" className={css.logoLink} aria-label="Go to home">
                    <img src="/crownwhite.svg" alt="" className={css.logo} />
                </a>
                <h1 className={css.title}>Welcome to Pubquizzz</h1>
                <p className={css.subtitle}>
                    Don&apos;t have an account?{" "}
                    <Link to="/signup" className={css.subtitleLink}>
                        Sign up
                    </Link>
                </p>
            </div>

            <div className={css.field}>
                <label htmlFor="email" className={css.label}>
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={css.input}
                />
            </div>

            <div className={css.field}>
                <label htmlFor="password" className={css.label}>
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    placeholder="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={css.input}
                />
            </div>

            {error && <p className={css.error}>{error}</p>}

            <button
                type="submit"
                disabled={loading}
                className={`${css.submit} ${css.submitLogin}`}
            >
                {loading ? "Logging in..." : "Login"}
            </button>
        </form>
    );
}

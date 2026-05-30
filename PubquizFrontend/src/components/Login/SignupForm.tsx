import { type ChangeEvent, type SubmitEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerApi } from "@/api/http";

import css from "./Login.module.scss";

type SignupFormState = {
    email: string;
    username: string;
    password: string;
    confirm: string;
};

export default function SignupForm() {
    const navigate = useNavigate();
    const [form, setForm] = useState<SignupFormState>({
        email: "",
        username: "",
        password: "",
        confirm: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setForm((prev) => ({ ...prev, [id]: value }));
    };

    const onSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (form.password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }
        if (form.password !== form.confirm) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                email: form.email,
                password: form.password,
                displayName: form.username,
            };

            const data = await registerApi(payload);

            localStorage.setItem("token", data.accessToken);
            navigate("/login");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Signup failed");
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
                <h1 className={css.title}>Create your account</h1>
                <p className={css.subtitle}>
                    Already have an account?{" "}
                    <Link to="/login" className={css.subtitleLink}>
                        Log in
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
                    value={form.email}
                    onChange={onChange}
                    className={css.input}
                />
            </div>

            <div className={css.field}>
                <label htmlFor="username" className={css.label}>
                    Username
                </label>
                <input
                    id="username"
                    type="text"
                    placeholder="username"
                    required
                    value={form.username}
                    onChange={onChange}
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
                    value={form.password}
                    onChange={onChange}
                    className={css.input}
                />
            </div>

            <div className={css.field}>
                <label htmlFor="confirm" className={css.label}>
                    Repeat password
                </label>
                <input
                    id="confirm"
                    type="password"
                    placeholder="repeat password"
                    required
                    value={form.confirm}
                    onChange={onChange}
                    className={css.input}
                />
            </div>

            {error && <p className={css.error}>{error}</p>}

            <button type="submit" disabled={loading} className={css.submit}>
                {loading ? "Creating..." : "Create account"}
            </button>
        </form>
    );
}

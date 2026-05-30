import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createGameApi, fetchQuizApi } from "@/api/http";
import { useAuth } from "@/context/useAuth";

import css from "./Browse.module.scss";

type Quiz = {
    pubquizId?: string;
    id?: string;
    title: string;
    description?: string;
    questions?: unknown[];
};

export default function Browse() {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchQuizApi()
            .then((data) => setQuizzes(Array.isArray(data) ? data : [data]))
            .catch(console.error);
    }, []);

    const triggerError = (id: string, message: string) => {
        setErrors((prev) => ({ ...prev, [id]: message }));
        setTimeout(() => {
            setErrors((prev) => {
                const next = { ...prev };
                delete next[id];
                return next;
            });
        }, 3000);
    };

    const handleHost = async (quizId: string) => {
        if (!user) {
            triggerError(quizId, "Please log in to host");
            return;
        }

        setLoading(quizId);
        try {
            const gameData = await createGameApi(quizId);
            navigate(`/host/${gameData.roomCode}`);
        } catch {
            triggerError(quizId, "Failed to start");
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className={css.page}>
            <h1 className={css.title}>Browse Quizzes</h1>
            <div className={css.list}>
                {quizzes.map((quiz) => {
                    const id = quiz.pubquizId ?? quiz.id ?? "";
                    const isError = !!errors[id];
                    const isLoading = loading === id;

                    return (
                        <article key={id} className={css.card}>
                            <header className={css.cardHeader}>
                                <h2 className={css.cardTitle}>{quiz.title}</h2>
                                <p className={css.cardDescription}>
                                    {quiz.description ?? ""}
                                </p>
                            </header>
                            <div className={css.cardContent}>
                                <p className={css.meta}>
                                    {quiz.questions?.length ?? 0} Questions
                                </p>
                            </div>
                            <footer className={css.cardFooter}>
                                <button
                                    type="button"
                                    className={`${css.button} ${
                                        isError ? css.buttonError : ""
                                    }`}
                                    onClick={() => handleHost(id)}
                                    disabled={isLoading || isError}
                                >
                                    {isError
                                        ? errors[id]
                                        : isLoading
                                            ? "Creating..."
                                            : "Host Game"}
                                </button>
                            </footer>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}
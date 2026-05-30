import { useCallback, useEffect, useState } from "react";
import Question from "./Question";
import Summary from "./Summary";
import ErrorPage from "../Error/Error";
import { fetchQuizApi } from "@/api/http";
import quizCompleteImg from "@/assets/rinkoShirokane.png";

type AnswerOption = {
    answerOptionId?: string;
    id?: string;
    text: string;
    isCorrect?: boolean;
};

type QuestionItem = {
    questionId?: string;
    text: string;
    answers: AnswerOption[];
};

type QuizData = {
    questions: QuestionItem[];
};

export default function Quiz() {
    const [quiz, setQuiz] = useState<QuizData | null>(null);
    const [userAnswers, setUserAnswers] = useState<(AnswerOption | null)[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const activeQuestionIndex = userAnswers.length;
    const totalQuestions = quiz?.questions?.length ?? 0;
    const quizIsComplete =
        totalQuestions > 0 && activeQuestionIndex === totalQuestions;

    const handleSelectAnswer = useCallback(
        (selectedAnswer: AnswerOption | null) => {
            setUserAnswers((prev) => {
                if (prev.length >= totalQuestions) return prev;
                return [...prev, selectedAnswer];
            });
        },
        [totalQuestions],
    );

    const handleSkipAnswer = useCallback(
        () => handleSelectAnswer(null),
        [handleSelectAnswer],
    );

    useEffect(() => {
        const img = new Image();
        img.src = quizCompleteImg;
        return () => {
            img.src = "";
        };
    }, []);

    useEffect(() => {
        const abortController = new AbortController();

        (async () => {
            setIsFetching(true);

            try {
                const data = await fetchQuizApi({
                    signal: abortController.signal,
                });
                setQuiz(data as QuizData);
            } catch (err: unknown) {
                if (err instanceof DOMException && err.name === "AbortError") {
                    return;
                }
                setError(
                    err instanceof Error
                        ? err.message
                        : "Could not fetch quiz",
                );
            } finally {
                setIsFetching(false);
            }
        })();

        return () => abortController.abort();
    }, []);

    if (error) {
        return <ErrorPage title="An error occurred" message={error} />;
    }

    if (isFetching || !quiz) {
        return <p>Loading...</p>;
    }

    const questions = quiz.questions ?? [];
    if (questions.length === 0) {
        return (
            <ErrorPage
                title="No questions"
                message="This quiz doesn't have any questions yet."
            />
        );
    }

    if (quizIsComplete) {
        return <Summary userAnswers={userAnswers} />;
    }

    const question = quiz.questions[activeQuestionIndex];
    const isLast = activeQuestionIndex === questions.length - 1;

    return (
        <div>
            <Question
                key={activeQuestionIndex}
                index={activeQuestionIndex}
                question={{ ...question, isLast }}
                onSelectAnswer={handleSelectAnswer}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>
    );
}
import {useCallback, useEffect, useState} from "react";
import Question from './Question.jsx'
import './Quiz.css'
import Summary from './Summary.jsx'
import ErrorPage from '../Error/Error.jsx'
import { fetchQuizApi } from '../../api/http.jsx'
import quizCompleteImg from "../../assets/rinkoShirokane.png";

export default function Quiz() {
    const [quiz, setQuiz] = useState(null)
    const [userAnswers, setUserAnswers] = useState([])
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();

    const activeQuestionIndex = userAnswers.length;
    const totalQuestions = quiz?.questions?.length ?? 0;
    const quizIsComplete = totalQuestions > 0 && activeQuestionIndex === totalQuestions;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((prevUserAnswers) => {
            if (prevUserAnswers.length >= totalQuestions) return prevUserAnswers;
            return [...prevUserAnswers, selectedAnswer];
        });
    }, [totalQuestions])
    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

    useEffect(() => {
        const img = new Image();
        img.src = quizCompleteImg;
        return () => { img.src = ""; };
    }, []);

    useEffect(() => {
        const abortController = new AbortController();

        (async () => {
            setIsFetching(true);

            try {
                const data = await fetchQuizApi({ signal: abortController.signal });
                setQuiz(data)
            }
            catch (error) {
                if (error.name !== "AbortError") {
                    setError({message: error.message || 'Could not fetch quiz'});
                }
            }
            finally {
                setIsFetching(false);
            }
        })();
        return () => abortController.abort();
    }, []);

    if (error) {
        return <ErrorPage title="An error occurred" message={error.message ?? String(error)} />;
    }

    if (isFetching || !quiz) {
        return <p>Loading...</p>;
    }

    const questions = quiz.questions ?? [];
    if (questions.length === 0) {
        return <ErrorPage title="No questions" message="This quiz doesn't have any questions yet." />;
    }

    if (quizIsComplete) {
        return <Summary userAnswers={userAnswers} />

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
    )
}
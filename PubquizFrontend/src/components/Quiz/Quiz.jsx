import {useCallback, useEffect, useState} from "react";
import QUESTIONS from '../../data/questions.js'
import Question from './Question.jsx'
import './Quiz.css'
import Summary from './Summary.jsx'
import ErrorPage from '../Error/Error.jsx'

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([])
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();

    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });
    }, [])
    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

    useEffect(() => {
        async function fetchQuiz() {
            setIsFetching(true);

            try {
                const response = await fetch("ff");

                if (!response.ok) {
                    throw new Error("Failed to fetch quiz")
                }
                const responseData = await response.json();
            }
            catch (error) {
                setError({message: error.message || 'Could not fetch quiz'});
            }
            finally {
                setIsFetching(false);
            }
        }
        fetchQuiz();
    }, []);

    if (error) {
        return <ErrorPage title="An error occurred" message={error.message ?? String(error)} />;
    }

    if (isFetching) {
        return <p>Loading...</p>;
    }

    if (quizIsComplete) {
        return (
            <Summary userAnswers={userAnswers} />
        )
    }

    return (
        <div>
            <Question
                key={activeQuestionIndex}
                index={activeQuestionIndex}
                onSelectAnswer={handleSelectAnswer}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>
    )
}
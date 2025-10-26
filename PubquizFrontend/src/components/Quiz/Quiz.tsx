import {useCallback, useState} from "react";
import QUESTIONS from '../../data/questions.js'
import quizCompleteImg from '../../assets/rinkoShirokane.png'
import Question from './Question'
import './Quiz.css'

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([])

    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });
    }, [])

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

    if (quizIsComplete) {
        return (
            <div id="result">
                <img src={quizCompleteImg} alt="Quiz Complete image"/>
                <h2>Quiz completed</h2>
            </div>
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
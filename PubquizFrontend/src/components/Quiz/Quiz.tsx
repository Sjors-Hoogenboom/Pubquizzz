import {useCallback, useState} from "react";
import QUESTIONS from '../../data/questions.js'
import QuestionTimer from "./QuestionTimer.tsx";
import quizCompleteImg from '../../assets/rinkoShirokane.png'
import Answers from "./Answers.tsx";
import './Quiz.css'

export default function Quiz() {
    const [answerState, setAnswerState] = useState('')
    const [userAnswers, setUserAnswers] = useState([])

    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setAnswerState('answered')
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });

        setTimeout(() => {
            if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setAnswerState('correct')
            } else {
                setAnswerState('wrong')
            }
            setTimeout(() => {
                setAnswerState('')
            }, 2000);
        }, 1000);
    }, [activeQuestionIndex])

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
            <div>
                <QuestionTimer
                    key={activeQuestionIndex}
                    timeout={15000}
                    onTimeout={handleSkipAnswer}/>
                <h2 className={`question-text ${answerState || ''}`}>
                    {QUESTIONS[activeQuestionIndex].text}
                </h2>
                <Answers
                    key={activeQuestionIndex}
                    answers={QUESTIONS[activeQuestionIndex].answers}
                    selectedAnswer={userAnswers[userAnswers.length - 1]}
                    answerState={answerState}
                    onSelect={handleSelectAnswer}
                />
            </div>
        </div>
    )
}
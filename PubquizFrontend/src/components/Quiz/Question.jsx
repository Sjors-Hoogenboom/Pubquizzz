import QuestionTimer from "@/components/Quiz/QuestionTimer.jsx";
import Answers from "@/components/Quiz/Answers.jsx";
import { useState, useRef } from "react";

export default function Question({
                                     index,
                                     question,
                                     onSelectAnswer,
                                     onSkipAnswer
                                 }) {
    if (!question) return null;
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    })
    const timeouts = useRef([]);

    let timer = 10000;

    if (answer.selectedAnswer) {
        timer = 1000;
    }

    if (answer.isCorrect !== null) {
        timer = 2000;
    }

    function handleSelectAnswer(selected) {
        setAnswer({
            selectedAnswer: selected,
            isCorrect: null
        })

        timeouts.current.push(setTimeout(() => {
            const isCorrect = !!selected.isCorrect;
            setAnswer({ selectedAnswer: selected, isCorrect });

            timeouts.current.push(setTimeout(() => onSelectAnswer(selected), 2000));
        }, 1000));
    }

    let answerState = '';
    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong'
    } else if (answer.selectedAnswer) {
        answerState = 'answered'
    }

    return (
        <div>
            <QuestionTimer
                key={timer}
                timeout={timer}
                onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
                mode={answerState}
            />
            <h2 className={`question-text ${answerState || ''}`}>
                {question.text}
            </h2>
            <Answers
                key={question.questionId ?? `${index}`}
                answers={question.answers}
                selectedAnswer={answer.selectedAnswer}
                answerState={answerState}
                onSelect={handleSelectAnswer}
            />
        </div>
    )
}
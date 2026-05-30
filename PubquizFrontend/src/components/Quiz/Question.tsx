import QuestionTimer from "@/components/Quiz/QuestionTimer";
import Answers from "@/components/Quiz/Answers";
import { useState, useRef } from "react";

import css from "./Quiz.module.scss";

type AnswerOption = {
    answerOptionId?: string;
    id?: string;
    text: string;
    isCorrect?: boolean;
};

type QuestionData = {
    text: string;
    questionId?: string;
    answers: AnswerOption[];
    isLast: boolean;
};

type QuestionProps = {
    index: number;
    question: QuestionData;
    onSelectAnswer: (answer: AnswerOption | null) => void;
    onSkipAnswer: () => void;
};

type AnswerState = {
    selectedAnswer: AnswerOption | "";
    isCorrect: boolean | null;
};

export default function Question({
    index,
    question,
    onSelectAnswer,
    onSkipAnswer,
}: QuestionProps) {
    const [answer, setAnswer] = useState<AnswerState>({
        selectedAnswer: "",
        isCorrect: null,
    });
    const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

    if (!question) return null;

    let timer = 10000;

    if (answer.selectedAnswer) {
        timer = 1000;
    }

    if (answer.isCorrect !== null) {
        timer = 2000;
    }

    function handleSelectAnswer(selected: AnswerOption) {
        setAnswer({
            selectedAnswer: selected,
            isCorrect: null,
        });

        timeouts.current.push(
            setTimeout(() => {
                const isCorrect = !!selected.isCorrect;
                setAnswer({ selectedAnswer: selected, isCorrect });

                timeouts.current.push(
                    setTimeout(() => onSelectAnswer(selected), 2000),
                );
            }, 1000),
        );
    }

    let answerState: "" | "answered" | "correct" | "wrong" = "";
    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? "correct" : "wrong";
    } else if (answer.selectedAnswer) {
        answerState = "answered";
    }

    const textClass = [
        css.questionText,
        answerState ? css[answerState] : "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div>
            <QuestionTimer
                key={timer}
                timeout={timer}
                onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : null}
                mode={answerState}
            />
            <h2 className={textClass}>{question.text}</h2>
            <Answers
                key={question.questionId ?? `${index}`}
                answers={question.answers}
                selectedAnswer={answer.selectedAnswer}
                answerState={answerState}
                onSelect={handleSelectAnswer}
            />
        </div>
    );
}
import { useRef } from "react";

import css from "./Answers.module.scss";

type AnswerOption = {
    answerOptionId?: string;
    id?: string;
    text: string;
    isCorrect?: boolean;
};

type AnswersProps = {
    answers: AnswerOption[];
    selectedAnswer: AnswerOption | "" | null;
    answerState: "" | "answered" | "correct" | "wrong";
    onSelect: (answer: AnswerOption) => void;
};

type NormalizedAnswer = {
    id: string;
    text: string;
    isCorrect: boolean;
    raw: AnswerOption;
};

export default function Answers({
    answers,
    selectedAnswer,
    answerState,
    onSelect,
}: AnswersProps) {
    const shuffledAnswers = useRef<NormalizedAnswer[] | null>(null);

    if (!shuffledAnswers.current) {
        shuffledAnswers.current = answers
            .map<NormalizedAnswer>((a) => ({
                id: a.answerOptionId ?? a.id ?? a.text,
                text: a.text,
                isCorrect: !!a.isCorrect,
                raw: a,
            }))
            .sort(() => Math.random() - 0.5);
    }

    return (
        <ul className={css.list}>
            {shuffledAnswers.current.map((a) => {
                const selectedId =
                    selectedAnswer && typeof selectedAnswer === "object"
                        ? selectedAnswer.answerOptionId ??
                          selectedAnswer.id ??
                          selectedAnswer.text
                        : null;
                const isSelected = selectedId === a.id;

                let stateClass = "";
                if (answerState === "answered" && isSelected) {
                    stateClass = css.selected;
                } else if (
                    (answerState === "correct" || answerState === "wrong") &&
                    isSelected
                ) {
                    stateClass = css[answerState];
                }

                return (
                    <li key={a.id} className={css.answer}>
                        <button
                            type="button"
                            onClick={() => onSelect(a.raw)}
                            className={`${css.button} ${stateClass}`}
                            disabled={answerState !== ""}
                        >
                            {a.text}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}
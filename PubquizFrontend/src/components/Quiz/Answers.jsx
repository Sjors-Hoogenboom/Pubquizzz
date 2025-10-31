import {useRef} from "react";
import {Button} from "@/components/ui/button.jsx";

export default function Answers({answers, selectedAnswer, answerState, onSelect}) {
    const shuffledAnswers = useRef();

    if (!shuffledAnswers.current) {
        shuffledAnswers.current = answers
            .map(a => ({
                id: a.answerOptionId ?? a.id ?? a.text,
                text: a.text ?? a,
                isCorrect: !!a.isCorrect,
                raw: a
            }))
            .sort(() => Math.random() - 0.5);
    }

    return (
        <ul id="answers">
            {shuffledAnswers.current.map((a) => {
                const isSelected =
                    selectedAnswer &&
                    (
                        (selectedAnswer.answerOptionId ?? selectedAnswer.id ?? selectedAnswer.text)
                        === a.id
                    );

                let cssClass = "";

                if (answerState === "answered" && isSelected) {
                    cssClass += " selected";
                } else if (
                    (answerState === "correct" || answerState === "wrong") &&
                    isSelected
                ) {
                    cssClass += answerState;
                }

                return (
                    <li key={a.id} className="answer">
                        <Button
                            variant="outline"
                            size="m"
                            onClick={() => onSelect(a.raw)}
                            className={cssClass}
                            disabled={answerState !== ""}
                        >
                            {a.text}
                        </Button>
                    </li>
                );
            })}
        </ul>
    );
}
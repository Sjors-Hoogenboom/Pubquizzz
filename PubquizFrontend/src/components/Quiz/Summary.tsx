import QUESTIONS from "@/data/questions";
import quizCompleteImg from '../../assets/rinkoShirokane.png'

export default function Summary({userAnswers}) {
    const skippedAnswers = userAnswers.filter(answer => answer === null);
    const correctAnswers = userAnswers.filter(
        (answer, index) => answer === QUESTIONS[index].answers[0]
    )

    const skippedAnswersShare = Math.round((skippedAnswers.length / userAnswers.length) * 100);
    const correctAnswersShare = Math.round((correctAnswers.length / userAnswers.length) * 100);
    const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

    return (
        <div>
            <img src={quizCompleteImg} alt="quiz completed image"/>
            <h2>Quiz completed</h2>
            <div>
                <p>
                    <span>
                        {skippedAnswersShare}%
                    </span>
                    <span>
                        skipped
                    </span>
                </p>
                <p>
                    <span>
                        {correctAnswersShare}%
                    </span>
                    <span>
                        answered correctly
                    </span>
                </p>
                <p>
                    <span>
                        {wrongAnswersShare}%
                    </span>
                    <span>
                        answered incorrectly
                    </span>
                </p>
            </div>
        </div>
    )
}
import quizCompleteImg from '../../assets/rinkoShirokane.png'

export default function Summary({userAnswers}) {
    const skippedAnswers = userAnswers.filter(a => a === null);
    const answeredAnswers = userAnswers.filter(a => a !== null);

    const correctAnswers = answeredAnswers.filter(a => a && a.isCorrect);

    const skippedAnswersShare = userAnswers.length === 0
        ? 0
        : Math.round((skippedAnswers.length / userAnswers.length) * 100);

    const correctAnswersShare = userAnswers.length === 0
        ? 0
        : Math.round((correctAnswers.length / userAnswers.length) * 100);

    const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

    return (
        <div>
            <img src={quizCompleteImg} alt="quiz completed image"/>
            <h2>Quiz completed</h2>
            <div>
                <p>
                    <span>{skippedAnswersShare}%</span>
                    <span>skipped</span>
                </p>
                <p>
                    <span>{correctAnswersShare}%</span>
                    <span>answered correctly</span>
                </p>
                <p>
                    <span>{wrongAnswersShare}%</span>
                    <span>answered incorrectly</span>
                </p>
            </div>
        </div>
    );
}
import {useState, useEffect} from "react";

export default function QuestionTimer({timeout, onTimeout}) {

    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        setTimeout(onTimeout, timeout);
        return () => {
            clearTimeout(timeout);
        }
    }, [timeout, onTimeout]);

    useEffect(() => {
        const interval = setInterval(() => setRemainingTime((prevRemainingTime: number) => prevRemainingTime - 100), 100)
        return () => {
            clearInterval(interval)
        };
    }, []);

    return (
        <progress max={timeout} value={remainingTime} />
    )
}
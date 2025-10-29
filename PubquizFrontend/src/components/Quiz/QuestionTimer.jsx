import {useState, useEffect} from "react";

export default function QuestionTimer({timeout, onTimeout, mode}) {

    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        setRemainingTime(timeout);
    }, [timeout]);

    useEffect(() => {
        if (!onTimeout) return;
        const id = setTimeout(onTimeout, timeout);
        return () => clearTimeout(id);
    }, [timeout, onTimeout]);

    useEffect(() => {
        const id = setInterval(() => {
            setRemainingTime(prev => Math.max(prev - 100, 0));
        }, 100);
        return () => clearInterval(id);
    }, [timeout]);

    return (
        <progress max={timeout}
                  value={remainingTime}
                  className={mode}
        />
    )
}
import {Button} from "@/components/ui/button"
import {Link, useNavigate} from "react-router-dom"
import {useAuth} from "@/context/AuthContext.jsx";
import {useState} from "react";
import {Input} from "@/components/ui/input.jsx";

export default function Hero({onViewFeatures}) {
    const {user} = useAuth();
    const [joinCode, setJoinCode] = useState("");
    const navigate = useNavigate();

    const name = user?.displayName;

    const handleJoinQuiz = () => {
        if (!joinCode.trim().toUpperCase()) return;

        console.log("Joining", joinCode);
    }

    return (
        <section
            className="relative mx-auto flex min-h-[60svh] w-full max-w-6xl flex-col items-center justify-center px-4 text-center">
            <h1 className="mb-2 text-4xl font-bold tracking-tight sm:text-6xl">
                {user ? (
                        <span
                            className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
                            Welcome, {name}
                        </span>
                    ) :
                    (
                        "Pubquizzz maker"
                    )}
            </h1>

            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                {user ? (
                    "Ready to make or play a quiz?"
                ) : (
                    "Create and host your own pubquizzes easily. Check the latest quizzes and start playing today."
                )}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button size="lg" asChild>
                    <Link to="/quizzes/browse">Get started</Link>
                </Button>
                <Button variant="outline" size="lg" onClick={onViewFeatures}>
                    View features
                </Button>
            </div>

            <div className="mt-6 w-full max-w-sm">
                {user ? (
                    <div className="flex w-full items-center space-x-2">
                        <Input
                            type="text"
                            placeholder="Enter quiz code..."
                            value={joinCode}
                            onChange={(e) => setJoinCode(e.target.value)}
                            className="h-12"
                        />
                        <Button
                            className="h-12 bg-sky-600 hover:bg-sky-700 cursor-pointer text-white"
                            onClick={handleJoinQuiz}
                        >
                            Join quiz
                        </Button>
                    </div>
                ) : (
                    <Button
                        className="h-12 w-full text-base bg-sky-600 hover:bg-sky-700"
                        asChild
                    >
                        <Link
                            to="/login"
                            className="!text-white hover:text-white"
                        >
                            Login
                        </Link>
                    </Button>
                )}
            </div>
        </section>
    )
}
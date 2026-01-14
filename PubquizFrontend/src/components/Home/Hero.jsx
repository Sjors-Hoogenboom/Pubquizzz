import {Button} from "@/components/ui/button"
import {Link} from "react-router-dom"
import {useAuth} from "@/context/AuthContext.jsx";

export default function Hero({onViewFeatures}) {
    const {user} = useAuth();

    const name = user?.displayName;

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

            <div className="mt-6 w-full max-w-md">
                <Button className="h-12 w-full text-base bg-sky-600" variant="secondary">
                    Join quiz
                </Button>
            </div>
        </section>
    )
}
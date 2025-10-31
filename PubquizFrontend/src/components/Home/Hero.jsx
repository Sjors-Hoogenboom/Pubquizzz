import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function Hero({ onViewFeatures }) {
    return (
        <section className="relative mx-auto flex min-h-[60svh] w-full max-w-6xl flex-col items-center justify-center px-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Pubquizzz maker</h1>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
                Create and host your own (pub)quizzes
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
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import { cn } from "@/lib/utils"

function Navbar({ onBrowse, onHome }) {
    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/50">
            <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
                <div className="flex items-center gap-5">
                    <button
                        onClick={onHome}
                        className="rounded-md p-1 ring-offset-background transition hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-label="Go to home"
                    >
                        <img src="/crownwhite.svg" alt="crown" className="h-6 w-6 select-none" draggable="false"/>
                    </button>
                        <button
                            onClick={onBrowse}
                            className="group inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-semibold text-foreground/90 ring-offset-background transition hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                            Browse quizzes
                            <span aria-hidden
                                  className="translate-x-0 transition-transform group-hover:translate-x-0.5">▸</span>
                        </button>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" aria-label="GitHub" asChild className="h-9 w-9">
                        <a
                            href="https://github.com/Sjors-Hoogenboom"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src="/github.svg" alt="" className="h-5 w-5" />
                        </a>
                    </Button>
                    <Button variant="ghost" size="sm">Sign in</Button>
                    <Button size="sm">Sign up</Button>
                </div>
            </nav>
        </header>
    )
}

function Hero({ onViewFeatures, onBrowse }) {
    return (
        <section className="relative mx-auto flex min-h-[60svh] w-full max-w-6xl flex-col items-center justify-center px-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                Pubquizzz maker
            </h1>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
                Create and host your own (pub)quizzes
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button size="lg" onClick={onBrowse}>Get started</Button>
                <Button variant="outline" size="lg" onClick={onViewFeatures}>
                    View features
                </Button>
            </div>

            <div className="mt-6 w-full max-w-md">
                <Button className="w-full h-12 text-base bg-sky-600" variant="secondary">
                    Join quiz
                </Button>
            </div>
        </section>
    )
}

function Features() {
    return (
        <section id="features" className="mx-auto w-full max-w-6xl px-4 pb-24 pt-16">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Card
                    className="transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg/10 hover:border-primary/30 motion-safe:animate-[card-in_.35s_ease-out_both]"
                >
                    <CardHeader><CardTitle>Question types</CardTitle></CardHeader>
                    <CardContent className="text-sm text-muted-foreground">Multiple-choice, open-ended, and estimate.</CardContent>
                    <CardContent className="text-sm text-muted-foreground">More coming soon</CardContent>
                </Card>

                <Card
                    className="transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg/10 hover:border-primary/30 motion-safe:animate-[card-in_.35s_ease-out_both]"
                >
                    <CardHeader><CardTitle>Free to play</CardTitle></CardHeader>
                    <CardContent className="text-sm text-muted-foreground">All completely free, no paywalls or ads.</CardContent>
                </Card>

                <Card
                    className="transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg/10 hover:border-primary/30 motion-safe:animate-[card-in_.35s_ease-out_both]"
                >
                    <CardHeader><CardTitle>Want to host your own pubquiz?</CardTitle></CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                        Request creator privileges from the owner when you’re ready to create your own quiz
                    </CardContent>
                </Card>

                <Card
                    className="transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg/10 hover:border-primary/30 motion-safe:animate-[card-in_.35s_ease-out_both]"
                >
                    <CardHeader><CardTitle>How it works</CardTitle></CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                        Host a game, share the code to your friends, and play. It's as simple as that
                    </CardContent>
                </Card>

                <Card
                    className="sm:col-span-2 lg:col-span-1 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg/10 hover:border-primary/30 motion-safe:animate-[card-in_.35s_ease-out_both]"
                >
                    <CardHeader><CardTitle>More coming soon</CardTitle></CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                        Beta project, planning on adding leaderboards, themes, Dutch language support, more question types and more...
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}


function Footer() {
    return (
        <footer className="border-t border-border/40">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 text-sm">
                <p className="text-muted-foreground">© {new Date().getFullYear()} Pubquizzz</p>
                <nav className="flex items-center gap-4">
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                        Donate
                    </button>
                    <button
                        onClick={() => window.open("https://github.com/", "_blank")}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        GitHub
                    </button>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                        Contact
                    </button>
                </nav>
            </div>
        </footer>
    )
}

export default function Home() {
    const featuresRef = useRef(null)

    const handleViewFeatures = () => {
        const el = document.getElementById("features")
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    const goToBrowse = () => (window.location.href = "/quizzes/browse");
    const goHome = () => (window.location.href = "/");

    return (
        <>
            <Navbar onBrowse={goToBrowse} onHome={goHome}/>
            <main className="pt-14">
                <Hero onViewFeatures={handleViewFeatures} onBrowse={goToBrowse} />
                <Features ref={featuresRef} onBrowse={goToBrowse} />
            </main>
            <Footer />
        </>
    )
}
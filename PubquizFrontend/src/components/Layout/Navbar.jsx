import { Button } from "@/components/ui/button"

export default function Navbar({ onBrowse, onHome }) {
    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/50">
            <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
                <div className="flex items-center gap-5">
                    <button
                        onClick={onHome}
                        className="rounded-md p-1 ring-offset-background transition hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-label="Go to home"
                    >
                        <img src="/crownwhite.svg" alt="crown" className="h-6 w-6 select-none" draggable="false" />
                    </button>

                    <button
                        onClick={onBrowse}
                        className="group inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-semibold text-foreground/90 ring-offset-background transition hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        Browse quizzes
                        <span aria-hidden className="translate-x-0 transition-transform group-hover:translate-x-0.5">▸</span>
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

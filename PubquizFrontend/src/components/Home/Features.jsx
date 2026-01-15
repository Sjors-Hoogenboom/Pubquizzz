import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Features() {
    return (
        <section id="features" className="mx-auto w-full max-w-6xl px-4 pb-24 pt-16">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Card
                    className="transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg/10 hover:border-primary/30 motion-safe:animate-[card-in_.35s_ease-out_both]"
                    style={{ animationDelay: "80ms" }}
                >
                    <CardHeader><CardTitle>Question types</CardTitle></CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                        Multiple-choice, open-ended, and estimate.
                    </CardContent>
                    <CardContent className="text-sm text-muted-foreground">
                        More coming soon
                    </CardContent>
                </Card>

                <Card
                    className="transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg/10 hover:border-primary/30 motion-safe:animate-[card-in_.35s_ease-out_both]"
                    style={{ animationDelay: "160ms" }}
                >
                    <CardHeader><CardTitle>Free to play</CardTitle></CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                        All completely free, no paywalls or ads.
                    </CardContent>
                </Card>

                <Card
                    className="transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg/10 hover:border-primary/30 motion-safe:animate-[card-in_.35s_ease-out_both]"
                    style={{ animationDelay: "240ms" }}
                >
                    <CardHeader><CardTitle>Want to host your own pubquiz?</CardTitle></CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                        Request creator privileges from the owner when you’re ready to create your own quiz
                    </CardContent>
                </Card>

                <Card
                    className="transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg/10 hover:border-primary/30 motion-safe:animate-[card-in_.35s_ease-out_both]"
                    style={{ animationDelay: "320ms" }}
                >
                    <CardHeader><CardTitle>How it works</CardTitle></CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                        Host a game, share the code to your friends, and play. It's as simple as that
                    </CardContent>
                </Card>

                <Card
                    className="sm:col-span-2 lg:col-span-1 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg/10 hover:border-primary/30 motion-safe:animate-[card-in_.35s_ease-out_both]"
                    style={{ animationDelay: "400ms" }}
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

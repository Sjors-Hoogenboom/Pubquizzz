import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className="flex flex-col gap-6">
            <form onSubmit={onSubmit} className="space-y-6">
                <div className="flex flex-col items-center gap-2 text-center">
                    <a
                        href="/"
                        className="flex items-center justify-center rounded-md p-2 ring-offset-background transition hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-label="Go to home"
                    >
                        <img src="/crownwhite.svg" alt="" className="h-8 w-8"/>
                    </a>
                    <h1 className="text-xl font-bold">Welcome to Pubquizzz</h1>
                    <p className="text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <a href="/signup" className="underline underline-offset-4 hover:text-foreground">
                            Sign up
                        </a>
                    </p>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" className="mt-8">Login</Button>
                </div>
            </form>
        </div>
    )
}

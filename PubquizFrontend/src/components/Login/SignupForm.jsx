import {useState} from "react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Link, useNavigate} from "react-router-dom"
import {registerApi} from "@/api/http.jsx";

export default function SignupForm() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        username: "",
        password: "",
        confirm: "",
    })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const onChange = (e) => {
        const {id, value} = e.target
        setForm((f) => ({...f, [id]: value}))
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (form.password.length < 8) {
            setError("Password must be at least 8 characters.")
            return
        }
        if (form.password !== form.confirm) {
            setError("Passwords do not match.")
            return
        }

        setLoading(true)
        try {
            const payload = {
                email: form.email,
                password: form.password,
                displayName: form.username,
            };

            const data = await registerApi(payload);

            localStorage.setItem("token", data.accessToken);
            navigate("/login");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }

        console.log("Sign up:", form)
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
                    <h1 className="text-xl font-bold">Create your account</h1>
                    <p className="text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link to="/login" className="underline underline-offset-4 hover:text-foreground">
                            Log in
                        </Link>
                    </p>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        required
                        value={form.email}
                        onChange={onChange}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                        id="username"
                        type="text"
                        placeholder="username"
                        required
                        value={form.username}
                        onChange={onChange}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="password"
                        required
                        value={form.password}
                        onChange={onChange}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="confirm">Repeat password</Label>
                    <Input
                        id="confirm"
                        type="password"
                        placeholder="repeat password"
                        required
                        value={form.confirm}
                        onChange={onChange}
                    />
                </div>

                {error && (
                    <p className="text-sm text-destructive">
                        {error}
                    </p>
                )}

                <Button type="submit" className="mt-2">Create account</Button>
            </form>
        </div>
    )
}

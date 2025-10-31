export default function Footer() {
    return (
        <footer className="border-t border-border/40">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 text-sm">
                <p className="text-muted-foreground">© {new Date().getFullYear()} Pubquizzz</p>
                <nav className="flex items-center gap-4">
                    <button className="transition-colors text-muted-foreground hover:text-foreground">Donate</button>
                    <a
                        href="https://github.com/Sjors-Hoogenboom"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors text-muted-foreground hover:text-foreground"
                    >
                        GitHub
                    </a>
                    <button className="transition-colors text-muted-foreground hover:text-foreground">Contact</button>
                </nav>
            </div>
        </footer>
    )
}

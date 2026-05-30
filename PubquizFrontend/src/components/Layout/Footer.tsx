import css from "./Footer.module.scss";

export default function Footer() {
    return (
        <footer className={css.footer}>
            <div className={css.inner}>
                <p className={css.copy}>© {new Date().getFullYear()} Pubquizzz</p>
                <nav className={css.nav}>
                    <button type="button" className={css.link}>
                        Donate
                    </button>
                    <a
                        href="https://github.com/Sjors-Hoogenboom"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={css.link}
                    >
                        GitHub
                    </a>
                    <button type="button" className={css.link}>
                        Contact
                    </button>
                </nav>
            </div>
        </footer>
    );
}

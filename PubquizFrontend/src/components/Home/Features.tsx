import css from "./Features.module.scss";

type FeatureItem = {
    title: string;
    contents: string[];
    delay: string;
    span?: boolean;
};

const features: FeatureItem[] = [
    {
        title: "Question types",
        contents: [
            "Multiple-choice, open-ended, and estimate.",
            "More coming soon",
        ],
        delay: "80ms",
    },
    {
        title: "Free to play",
        contents: ["All completely free, no paywalls or ads."],
        delay: "160ms",
    },
    {
        title: "Want to host your own pubquiz?",
        contents: [
            "Request creator privileges from the owner when you’re ready to create your own quiz",
        ],
        delay: "240ms",
    },
    {
        title: "How it works",
        contents: [
            "Host a game, share the code to your friends, and play. It's as simple as that",
        ],
        delay: "320ms",
    },
    {
        title: "More coming soon",
        contents: [
            "Beta project, planning on adding leaderboards, themes, Dutch language support, more question types and more...",
        ],
        delay: "400ms",
        span: true,
    },
];

export default function Features() {
    return (
        <section id="features" className={css.section}>
            <div className={css.grid}>
                {features.map((feature) => (
                    <article
                        key={feature.title}
                        className={`${css.card} ${feature.span ? css.cardSpan : ""}`}
                        style={{ animationDelay: feature.delay }}
                    >
                        <header className={css.cardHeader}>
                            <h3 className={css.cardTitle}>{feature.title}</h3>
                        </header>
                        {feature.contents.map((content, idx) => (
                            <p key={idx} className={css.cardContent}>
                                {content}
                            </p>
                        ))}
                    </article>
                ))}
            </div>
        </section>
    );
}

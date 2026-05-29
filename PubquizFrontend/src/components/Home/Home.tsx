import Hero from "@/components/Home/Hero";
import Features from "@/components/Home/Features";

export default function Home() {
    const handleViewFeatures = () => {
        const element = document.getElementById("features");

        element?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <>
            <Hero onViewFeatures={handleViewFeatures} />
            <Features />
        </>
    );
}
import { useRef } from "react"
import Navbar from "@/components/Layout/Navbar"
import Hero from "@/components/Home/Hero"
import Features from "@/components/Home/Features"
import Footer from "@/components/Layout/Footer"

export default function Home() {
    const featuresRef = useRef(null)

    const handleViewFeatures = () => {
        const el = document.getElementById("features")
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    const goToBrowse = () => (window.location.href = "/quizzes/browse")
    const goHome = () => (window.location.href = "/")

    return (
        <>
            <Navbar onBrowse={goToBrowse} onHome={goHome} />
            <main className="pt-14">
                <Hero onViewFeatures={handleViewFeatures} onBrowse={goToBrowse} />
                <Features ref={featuresRef} onBrowse={goToBrowse} />
            </main>
            <Footer />
        </>
    )
}
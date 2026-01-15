import {useRef} from "react"
import Hero from "@/components/Home/Hero"
import Features from "@/components/Home/Features"

export default function Home() {
    const featuresRef = useRef(null)

    const handleViewFeatures = () => {
        const el = document.getElementById("features")
        if (el) el.scrollIntoView({behavior: "smooth", block: "start"})
    }

    return (
        <>
            <Hero onViewFeatures={handleViewFeatures}/>
            <Features ref={featuresRef}/>
        </>
    )
}

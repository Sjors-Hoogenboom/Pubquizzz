import Navbar from "@/components/Layout/Navbar"
import Footer from "@/components/Layout/Footer"
import { Outlet } from "react-router-dom"

export default function AppLayout() {
    return (
        <>
            <Navbar />
            <main className="pt-14">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

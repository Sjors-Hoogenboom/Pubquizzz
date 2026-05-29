import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import { Outlet } from "react-router-dom";

import css from "./AppLayout.module.scss";

export default function AppLayout() {
    return (
        <>
            <Navbar />
            <main className={css.main}>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

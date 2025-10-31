import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from "./components/Home/Home.jsx"
import {BrowserRouter, Navigate, Routes, Route} from "react-router-dom";
import LoginPage from "@/components/Login/Login.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
)

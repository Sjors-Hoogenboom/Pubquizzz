import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import AppLayout from "./AppLayout"
import Home from "@/components/Home/Home"
import LoginPage from "@/components/Login/Login"
import SignupPage from "@/components/Login/Signup"

const Browse = () => <div className="p-6">Quizzes browse page</div>

import "@/index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route index element={<Home />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="signup" element={<SignupPage />} />
                    <Route path="quizzes/browse" element={<Browse />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)

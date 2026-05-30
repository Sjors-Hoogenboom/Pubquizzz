import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AuthProvider } from "@/context/AuthProvider";

import AppLayout from "@/AppLayout";
import Home from "@/components/Home/Home";
import LoginPage from "@/components/Login/Login";
import SignupPage from "@/components/Login/Signup";
import Browse from "@/components/Browse/Browse";
import HostLobby from "@/components/Game/HostLobby";
import PlayerLobby from "@/components/Game/PlayerLobby";

import "@/styles/index.scss";

const rootElement = document.getElementById("root");

if (!rootElement) {
    throw new Error("Root element was not found.");
}

createRoot(rootElement).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route index element={<Home />} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="signup" element={<SignupPage />} />
                        <Route path="quizzes/browse" element={<Browse />} />
                        <Route path="host/:code" element={<HostLobby />} />
                        <Route path="play/:code" element={<PlayerLobby />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>,
);
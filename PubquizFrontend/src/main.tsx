import React from "react"
import ReactDOM from "react-dom/client"
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import { AuthProvider } from "@/context/AuthContext.tsx"
import AppLayout from "./AppLayout.tsx"
import Home from "@/components/Home/Home.tsx"
import LoginPage from "@/components/Login/Login.tsx"
import SignupPage from "@/components/Login/Signup.tsx"

import "@/index.scss"
import HostLobby from "@/components/Game/HostLobby.tsx";
import Browse from "@/components/Browse/Browse.tsx";
import PlayerLobby from "@/components/Game/PlayerLobby.tsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route element={<AppLayout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="login" element={<LoginPage/>}/>
                        <Route path="signup" element={<SignupPage/>}/>
                        <Route path="*" element={<Navigate to="/" replace/>}/>
                        <Route path="quizzes/browse" element={<Browse/>}/>
                        <Route path="host/:code" element={<HostLobby/>}/>
                        <Route path="play/:code" element={<PlayerLobby/>}/>
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
)
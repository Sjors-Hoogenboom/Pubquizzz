import { useEffect, useState, useRef } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useAuth } from "@/context/AuthContext";

export default function PlayerLobby() {
    const { code } = useParams();
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    const [connection, setConnection] = useState(null);
    const [status, setStatus] = useState("Connecting");

    const isConnecting = useRef(false);

    useEffect(() => {
        if (!loading && !user) {
            navigate("/login")
        }
    }, [user, loading, navigate])


    useEffect(() => {
        if (!code || isConnecting.current || !user || loading) return;

        isConnecting.current = true;
        const accessToken = localStorage.getItem("token")

        const newConnection = new HubConnectionBuilder()
            .withUrl(import.meta.env.VITE_API_BASE + "/gameRoom", {
                accessTokenFactory: () => accessToken
            })
            .configureLogging(LogLevel.Information)
            .withAutomaticReconnect()
            .build();

        newConnection.on("Error", (message) => {
            console.error("Lobby Error:", message);
            navigate("/");
        })

        newConnection.start()
            .then(() => {
                return newConnection.invoke("JoinRoom", code, user.displayName);
            })
            .then(() => {
                setConnection(newConnection)
                setStatus("Joined")
            })
            .catch(error => {
                setStatus("Error");
            })

        return () => {
            newConnection.stop();
            isConnecting.current = false;
        };
    }, [code, user, loading, navigate]);

    if (loading) {
        return <div className="text-white text-center pt-36">Loading account...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white p-4">
            {status === "Connecting" && (
                <div className="text-center animate-pulse">
                    <h2 className="text-2xl font-bold">Connecting to game..</h2>
                </div>
            )}

            {status === "Joined" && (
                <div className="text-center animate-in fade-in zoom-in duration-300 w-full max-w-md">
                    <div className="mb-8">
                        <h1 className="text-5xl font-black mb-2 tracking-tight">You're in!</h1>
                        <p className="text-slate-400 text-lg">Game PIN: {code}</p>
                    </div>

                    <div className="bg-slate-800 border-2 border-slate-700 rounded-xl p-8 shadow-2xl">
                        <p className="uppercase text-xs font-bold text-slate-500 tracking-widest mb-2">
                            Name
                        </p>
                        <div className="text-3xl font-bold text-indigo-400 truncate">
                            {user.displayName}
                        </div>

                        <div className="my-6 border-b border-slate-700"></div>

                        <p className="text-slate-400 text-sm">
                            Waiting for host to start...
                        </p>

                        <div className="flex justify-center mt-4 space-x-2">
                            <div className="w-3 h-3 bg-indigo-700 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce"></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
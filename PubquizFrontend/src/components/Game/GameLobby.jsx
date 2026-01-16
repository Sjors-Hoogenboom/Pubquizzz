import { useEffect, useState, useRef } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function GameLobby() {
    const { code } = useParams();
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    const [players, setPlayers] = useState([]);
    const [connection, setConnection] = useState(null);
    const [isHostVerified, setIsHostVerified] = useState(false);

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

        newConnection.on("PlayerJoined", (nickname) => {
            setPlayers(prev => [...prev, nickname]);
        });

        newConnection.on("Error", () => {
            navigate("/quizzes/browse");
        })

        newConnection.on("HostConnected", () => {
            setIsHostVerified(true)
        })

        newConnection.start()
            .then(() => {
                return newConnection.invoke("JoinAsHost", code);
            })
            .then(() => {
                setConnection(newConnection);
            })
            .catch(err => console.error("Connection Error: ", err));

        return () => {
            newConnection.stop();
            isConnecting.current = false;
        };
    }, [code, user, loading, navigate]);

    const handleStartGame = () => {
    };

    if (!isHostVerified) {
        return <div className="text-white text-center pt-36">Verifying if you're the host</div>;
    }

    return (
        <div className="flex flex-col items-center pt-50 min-h-screen bg-slate-950 text-white">
            <div className="text-center mb-8">
                <div className="bg-white text-slate-900 px-12 py-6 rounded-lg shadow-2xl">
                    <p className="text-2xl font-bold mb-2">Game PIN:</p>
                    <h1 className="text-7xl font-black tracking-widest">{code}</h1>
                </div>
            </div>

            <div className="w-full max-w-4xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold">
                        <span className="text-indigo-400">{players.length}</span> {players.length === 1 ? "Player" : "Players"}
                    </h3>
                    <Button
                        size="lg"
                        className="bg-indigo-500 hover:bg-indigo-800 text-lg px-8 py-6 hover:cursor-pointer font-bold"
                        onClick={handleStartGame}
                    >
                        Start Game
                    </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {players.map((player, index) => (
                        <div
                            key={index}
                            className="bg-slate-800 p-4 rounded-lg text-center font-semibold text-lg animate-in fade-in zoom-in duration-300"
                        >
                            {player}
                        </div>
                    ))}
                    {players.length === 0 && (
                        <p className="text-slate-500 col-span-full text-center italic">
                            Waiting for players to join...
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
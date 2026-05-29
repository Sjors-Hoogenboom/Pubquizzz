import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

import { useAuth } from "@/context/useAuth";

import css from "./HostLobby.module.scss";

export default function HostLobby() {
    const { code } = useParams<{ code: string }>();
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    const [players, setPlayers] = useState<string[]>([]);
    const [, setConnection] = useState<HubConnection | null>(null);
    const [isHostVerified, setIsHostVerified] = useState(false);

    const isConnecting = useRef(false);

    useEffect(() => {
        if (!loading && !user) {
            navigate("/login");
        }
    }, [user, loading, navigate]);

    useEffect(() => {
        if (!code || isConnecting.current || !user || loading) return;

        isConnecting.current = true;
        const accessToken = localStorage.getItem("token");

        const newConnection = new HubConnectionBuilder()
            .withUrl(import.meta.env.VITE_API_BASE + "/gameRoom", {
                accessTokenFactory: () => accessToken ?? "",
            })
            .configureLogging(LogLevel.Information)
            .withAutomaticReconnect()
            .build();

        newConnection.on("PlayerJoined", (nickname: string) => {
            setPlayers((prev) => [...prev, nickname]);
        });

        newConnection.on("UpdatePlayerList", (playerList: string[]) => {
            setPlayers(playerList);
        });

        newConnection.on("Error", () => {
            navigate("/quizzes/browse");
        });

        newConnection.on("HostConnected", () => {
            setIsHostVerified(true);
        });

        newConnection
            .start()
            .then(() => newConnection.invoke("JoinAsHost", code))
            .then(() => setConnection(newConnection))
            .catch((err) => console.error("Connection Error: ", err));

        return () => {
            newConnection.stop();
            isConnecting.current = false;
        };
    }, [code, user, loading, navigate]);

    const handleStartGame = () => {
        // TODO: implement start logic
    };

    if (!isHostVerified) {
        return <div className={css.verifying}>Verifying if you're the host</div>;
    }

    return (
        <div className={css.page}>
            <div className={css.pinCard}>
                <p className={css.pinLabel}>Game PIN:</p>
                <h1 className={css.pinValue}>{code}</h1>
            </div>

            <div className={css.players}>
                <div className={css.playersHeader}>
                    <h3 className={css.playersTitle}>
                        <span className={css.playersCount}>{players.length}</span>{" "}
                        {players.length === 1 ? "Player" : "Players"}
                    </h3>
                    <button
                        type="button"
                        className={css.startButton}
                        onClick={handleStartGame}
                    >
                        Start Game
                    </button>
                </div>

                <div className={css.playerGrid}>
                    {players.map((player, index) => (
                        <div key={index} className={css.playerCard}>
                            {player}
                        </div>
                    ))}
                    {players.length === 0 && (
                        <p className={css.empty}>
                            Waiting for players to join...
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
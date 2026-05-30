import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

import { useAuth } from "@/context/useAuth";

import css from "./PlayerLobby.module.scss";

type Status = "Connecting" | "Joined" | "Error";

export default function PlayerLobby() {
    const { code } = useParams<{ code: string }>();
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    const [, setConnection] = useState<HubConnection | null>(null);
    const [status, setStatus] = useState<Status>("Connecting");

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

        newConnection.on("Error", (message: string) => {
            console.error("Lobby Error:", message);
            navigate("/");
        });

        newConnection
            .start()
            .then(() => newConnection.invoke("JoinRoom", code, user.displayName))
            .then(() => {
                setConnection(newConnection);
                setStatus("Joined");
            })
            .catch(() => {
                setStatus("Error");
            });

        return () => {
            newConnection.stop();
            isConnecting.current = false;
        };
    }, [code, user, loading, navigate]);

    if (loading) {
        return <div className={css.loading}>Loading account...</div>;
    }

    return (
        <div className={css.page}>
            {status === "Connecting" && (
                <div className={css.connecting}>
                    <h2 className={css.connectingTitle}>Connecting to game..</h2>
                </div>
            )}

            {status === "Joined" && user && (
                <div className={css.joined}>
                    <div className={css.header}>
                        <h1 className={css.title}>You're in!</h1>
                        <p className={css.subtitle}>Game PIN: {code}</p>
                    </div>

                    <div className={css.card}>
                        <p className={css.cardLabel}>Name</p>
                        <div className={css.name}>{user.displayName}</div>

                        <hr className={css.divider} />

                        <p className={css.waiting}>Waiting for host to start...</p>

                        <div className={css.dots}>
                            <div className={`${css.dot} ${css.dot1}`} />
                            <div className={`${css.dot} ${css.dot2}`} />
                            <div className={`${css.dot} ${css.dot3}`} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
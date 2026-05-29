import { useEffect, useRef, useState } from "react";

import { useAuth } from "@/context/useAuth";

import css from "./UserNav.module.scss";

function getInitials(name: string | undefined): string {
    if (!name) return "U";
    return name
        .trim()
        .split(/\s+/)
        .map((part) => part[0] ?? "")
        .join("")
        .toUpperCase()
        .substring(0, 2);
}

export function UserNav() {
    const { logout, user } = useAuth();
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const displayName = user?.displayName || "User";
    const initials = getInitials(displayName);

    useEffect(() => {
        if (!open) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    const handleLogout = () => {
        setOpen(false);
        logout();
    };

    return (
        <div className={css.wrapper} ref={wrapperRef}>
            <button
                type="button"
                className={css.trigger}
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={() => setOpen((prev) => !prev)}
            >
                <span className={css.avatar}>{initials}</span>
            </button>

            {open && (
                <div className={css.menu} role="menu">
                    <div className={css.label}>
                        <p className={css.labelTitle}>My Account</p>
                        <p className={css.labelSub}>{displayName}</p>
                    </div>
                    <div className={css.separator} />
                    <button
                        type="button"
                        role="menuitem"
                        className={css.item}
                        onClick={handleLogout}
                    >
                        Log out
                    </button>
                </div>
            )}
        </div>
    );
}
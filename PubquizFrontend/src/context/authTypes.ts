export type AuthUser = {
    displayName: string;
};

export type AuthContextValue = {
    token: string | null;
    user: AuthUser | null;
    loading: boolean;
    login: (newToken: string) => void;
    logout: () => void;
};
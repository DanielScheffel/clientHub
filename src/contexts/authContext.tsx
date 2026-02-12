import { createContext, useContext, useState, type ReactNode } from "react";
import { api } from "../services/api";


interface AuthContextType {
    token: string | null;
    login: (email: string, senha: string) => Promise<void>
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem('token')
    );

    async function login(email: string, senha: string) {
        const response = await api.post('/login', {email, senha});

        const newToken = response.data.token;

        localStorage.setItem('token', newToken);
        setToken(newToken);
    }

    function logout() {
        localStorage.removeItem("token");
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error("useAuth must be used within AuthProvider")
    }

    return context;
}
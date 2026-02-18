import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/authContext";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError("");
        try {
            await login(email, senha);
            navigate("/dashboard");
        } catch (err: any) {
            setError("Email e senha inválidos");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
            />

            <Input
                id="password"
                name="password"
                type="password" 
                placeholder="Senha" 
                value={senha} 
                onChange={(e) => setSenha(e.target.value)}
            />

            {error && (
                <p>{ error }</p>
            )}

            <Button type="submit" className="w-full">
                Entrar
            </Button>
        </form>
    )
}
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


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
            setError("Email ou senha inválidos");
        }
    }

    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>ClientHub Login</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)}
            />

            {error && (
              <p className="text-sm text-red-500">{ error }</p>
            )}

            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );

}
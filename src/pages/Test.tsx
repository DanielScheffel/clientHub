import { useEffect } from "react";
import { api } from "../services/api";


export default function Test() {
    useEffect(() => {
    async function loginAndFetch() {
      try {
        // 1️⃣ LOGIN
        const loginResponse = await api.post("/login", {
          email: "daniel@gmail.com",
          senha: "22102004",
        });

        console.log("Login sucesso:", loginResponse.data);

        // ⚠️ CONFIRMA: sua API retorna { token: "..."} ?
        const token = loginResponse.data.token;

        localStorage.setItem("token", token);

        // 2️⃣ BUSCAR CLIENTES JÁ AUTENTICADO
        const clientsResponse = await api.get("/me");

        console.log("Clientes:", clientsResponse.data);

      } catch (error) {
        console.error("Erro:", error);
      }
    }

    loginAndFetch();
  }, []);

  return <h1>Testando Login...</h1>;
}
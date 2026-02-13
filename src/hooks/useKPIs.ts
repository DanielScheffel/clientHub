import { getClientesPorStatus, getClientesPorUsuario, getConversaoGlobal } from "@/services/kpiService";
import { useEffect, useState } from "react";

interface ConversaoGlobal {
    fechados: string;
    total: string;
    taxa_conversao: string | null;
}

interface ConversaoPorUsuario {
    id_usuario: number;
    nome: string;
    fechados: string;
    total: string;
    taxa_conversao: string | null;
}

interface ClientePorUsuario {
    id_usuario: number;
    nome: string;
    total_clientes: string;
}

export function useClientesPorStatus() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getClientesPorStatus()
            .then(setData)
            .finally(() => setLoading(false))
    }, []);

    return {data, loading};
}

export function useClientesPorUsuario() {
    const [data, setData] = useState<ClientePorUsuario[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getClientesPorUsuario()
            .then((result) => {
            setData(result || []);
        })
            .catch(() => {
                setData([]);
            })
            .finally(() => setLoading(false));
    }, []);


    return {data, loading}
}

export function useConversaoGlobal() {
    const [data, setData] = useState<ConversaoGlobal | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getConversaoGlobal("global")
            .then(setData)
            .finally(() => setLoading(false));
    }, [])

    return { data, loading };
}

export function useConversaoPorUsuario() {
    const [data, setData] = useState<ConversaoPorUsuario[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getConversaoGlobal("usuario")
            .then(setData)
            .finally(() => setLoading(false))
    }, [])

    return { data, loading };
}
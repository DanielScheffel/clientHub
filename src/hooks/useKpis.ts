import { getClientesFunil, getClientesOrigem, 
    getClientesPorStatus, 
    getClientesPorUsuario, 
    getClientesTotal, 
    getConversaoGlobal, 
    getTipoCliente } 
from "@/services/kpiService";
import { useEffect, useState } from "react";


interface ConversaoGlobal {
    fechados: string;
    total: string;
    taxa_conversao: string | null;
}

interface ConversaoPorUsuario {
    id_usuario: number;
    nome: string;
    fechados: number;
    total: number;
    taxa_conversao: number;
}

interface Origem {
    origem: string;
    total: number;
    percentual: number;
}

interface tipoCliente {
    tipo_cliente: string;
    quantidade: number;
    percentual: number;
}

interface ClientePorUsuario {
    id_usuario: number;
    nome: string;
    total_clientes: string;
}

interface ClienteFunil {
    status: string;
    status_labels: string;
    total: number;
    percentual: number;
}

const STATUS_LABELS: Record<string, string> = {
    novo: "Novo",
    negociacao: "Negociação",
    fechado: "Fechado",
    contatado: "Contatado",
    perdido: "Perdido",
}

export function useClientesPorStatus() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getClientesPorStatus()
            .then(setData)
            .finally(() => setLoading(false))
    }, [])

    return { data, loading }
}

export function useClientesTotal() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getClientesTotal()
            .then(setData)
            .finally(() => setLoading(false))
    }, [])

    return { data, loading };
}

export function useClientesPorUsuario() {
    const [data, setData] = useState<ClientePorUsuario[]>([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getClientesPorUsuario()
            .then((result) => {
                setData(result || []);
            })
            .catch(() => {
                setData([]);
            })
            .finally(() => setLoading(false))
    }, [])

    return { data, loading }
}

export function useConversaoGlobal() {
    const [data, setData] = useState<ConversaoGlobal | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getConversaoGlobal("global")
            .then(setData)
            .finally(() => setLoading(false))
    }, [])

    return { data, loading }
}

export function useConversaoUsuario() {
    const [data, setData] = useState<ConversaoPorUsuario | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getConversaoGlobal("usuario")
            .then((response: ConversaoPorUsuario[]) => {
                if(!response.length) return;

                const topUsuario = response.reduce((maior, atual) =>
                    atual.fechados > maior.fechados ? atual : maior
                );

                setData(topUsuario);
            })

            .finally(() => setLoading(false))
    }, []);

    return { data, loading }
}

export function useClienteOrigem() {
    const [data, setData] = useState<Origem | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getClientesOrigem()
            .then((response: Origem[]) => {
                if(!response.length) return;

                const maiorPercentual = response.reduce((maior, atual) =>
                    atual.percentual > maior.percentual ? atual : maior
                );

                setData(maiorPercentual);
            })
            .finally(() => setLoading(false));
    }, [])

    return { data, loading }
}

export function useClientePorTipo() {
    const [data, setData] = useState<tipoCliente[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTipoCliente()
            .then((response: tipoCliente[]) => {
                const formatted = response.map(item => ({
                    ...item,
                    tipo_cliente: item.tipo_cliente.toUpperCase(),
                }))
                setData(formatted)
            })
            .finally(() => setLoading(false));
    }, [])

    return { data, loading }
}

export function useClienteFunil() {
    const [data, setData] = useState<ClienteFunil[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getClientesFunil()
            .then((response: ClienteFunil[]) => {
                const formatted = response.map(item => ({
                    ...item,
                    status_labels: STATUS_LABELS[item.status] ?? item.status,
                }))

                setData(formatted);
            })
            .finally(() => setLoading(false))
    }, [])

    return { data, loading }
}
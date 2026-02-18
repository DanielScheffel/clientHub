import { getClientesOrigem, getClientesPorStatus, getClientesTotal, getConversaoGlobal, getTipoCliente } from "@/services/kpiService";
import { useEffect, useState } from "react";


interface ConversaoGlobal {
    fechados: string;
    total: string;
    taxa_conversao: string | null;
}

// interface ConversaoPorUsuario {
//     id_usuario: number;
//     nome: string;
//     fechados: string;
//     total: string;
//     taxa_conversao: string | null;
// }

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
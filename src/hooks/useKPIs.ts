import { getClientesPorStatus, getClientesPorUsuario } from "@/services/kpiService";
import { useEffect, useState } from "react";


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

interface ClientePorUsuario {
    id_usuario: number;
    nome: string;
    total_clientes: string;
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
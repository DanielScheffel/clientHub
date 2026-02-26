import { getClienteMes, getUltimosDias } from "@/services/kpiService";
import { useEffect, useState } from "react";


export interface ClientesMes {
    total: {
        mes_atual: number;
        mes_anterior: number;
        percentual: number | null;
    }
}

interface ClientesUltimosDias {
    total: number;
}

export function useClientesUltimosDias() {
    const [dias, setDias] = useState(10);
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const response: ClientesUltimosDias = await getUltimosDias(dias);
                setTotal(response.total);
            } finally {
                setLoading(false)
            }
        }
        fetchData();
    }, [dias])
    
    return { total, dias, setDias, loading }
}



export function useClientesMes() {
    const [data, setData] = useState<ClientesMes | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getClienteMes()
            .then(setData)
            .finally(() => setLoading(false))
    }, [])

    return { data, loading }
}
import { postUltimosDias } from "@/services/kpiService";
import { useEffect, useState } from "react";


interface ClientesUltimosDias {
    data: string;
    quantidade: number;
}


export function useClientesUltimosDias() {
    const [data, setData] = useState<ClientesUltimosDias[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        postUltimosDias()
            .then((response: ClientesUltimosDias[]) => {
                setData(response)
            })
            .finally(() => setLoading(false))
    }, [])

    return { data, loading }
}
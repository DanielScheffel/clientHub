import { api } from "./api"


export const getClientesTotal = async () => {
    const response = await api.get("dashboard/kpis/total");
    return response.data;
}

export const getClientesPorStatus = async () => {
    const response = await api.get("dashboard/kpis/clientes-por-status");
    return response.data.dados;
}

export const getConversaoGlobal = async (tipo: "global" | "usuario") => {
    const response = await api.get(`dashboard/kpis/conversao?tipo=${tipo}`);
    return response.data;
};

export const getClientesOrigem = async () => {
    const response = await api.get("dashboard/kpis/origem");
    return response.data;
}

export const getTipoCliente = async () => {
    const response = await api.get("dashboard/kpis/tipo-cliente");
    return response.data;
}

export const getClientesPorUsuario = async () => {
    const response = await api.get("dashboard/kpis/cliente-por-usuario");
    return response.data;
}

export const getClientesFunil = async () => {
    const response = await api.get("dashboard/kpis/funil");
    return response.data;
}

export const getClienteMes = async () => {
    const response = await api.get("dashboard/kpis/clientes/mes");
    return response.data;
}

// export const postUltimosDias = async (dias: number) => {
//     const response = await api.post("dashboard/kpis/clientes/ultimos-dias", {dias});
//     return response.data;
// }

export const getUltimosDias = async (dias: number) => {
    const response = await api.get("dashboard/kpis/clientes/ultimos-dias", { params: { dias }});
    return response.data;
}
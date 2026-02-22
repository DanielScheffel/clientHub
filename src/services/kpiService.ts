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

export const postUltimosDias = async () => {
    const response = await api.post("dashboard/kpis/clientes/ultimos-dias");
    return response.data;
}
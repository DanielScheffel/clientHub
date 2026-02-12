import { api } from "./api"


export const getClientesPorStatus = async () => {
    const response = await api.get("dashboard/kpis/clientes-por-status");
    return response.data.dados;
}

export const getClientesPorUsuario = async () => {
  const response = await api.get("dashboard/kpis/cliente-por-usuario");
  return response.data;
};

export const getConversaoGlobal = async () => {
  const response = await api.get("dashboard/kpis/conversao?tipo=global");
  return response.data.dados;
};

export const getTempoStatus = async () => {
  const response = await api.get("dashboard/kpis/tempo-status");
  return response.data.dados;
};
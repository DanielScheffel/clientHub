import { useConversaoGlobal } from "@/hooks/useKPIs";


export default function KPIConversaoChart() {
    const { data, loading } = useConversaoGlobal();

  if (loading) return <p>Carregando...</p>;
  if (!data) return null;

  const taxa = Number(data.taxa_conversao ?? 0);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-sm text-gray-500">Taxa de Conversão</h2>

      <p className="text-3xl font-bold text-blue-600">
        {taxa.toFixed(2)}%
      </p>

      <p className="text-sm text-gray-400">
        {data.fechados} de {data.total} clientes fechados
      </p>
    </div>
  );
}
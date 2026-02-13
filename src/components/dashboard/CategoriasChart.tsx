import { useConversaoGlobal, useConversaoPorUsuario } from "@/hooks/useKPIs";
import { Bar } from "react-chartjs-2";


export default function CategoriasChart() {

    const { data: globalData, loading: globalLoading } = useConversaoGlobal();
    const { data: usuarioData, loading: usuarioLoading } = useConversaoPorUsuario();

    if(globalLoading || usuarioLoading) return <p>Carregando...</p>
    if(!globalData || !usuarioData) return null;

    const taxa = Number(globalData.taxa_conversao ?? 0)

    const chartData = {
        labels: usuarioData.map((item) => item.nome),
        datasets: [
            {
                label: "Taxa de Conversão %",
                data: usuarioData.map((item) => Number(item.taxa_conversao ?? 0))
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    }

    return (
        <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-4 h-4 rounded-full" style={{backgroundColor: "#8b5cf6"}} />
                        <h3 className="text-lg font-semibold text-gray-900">Taxa de Conversão</h3>
                    <p className="text-3xl font-bold text-blue-600 mb-1">{taxa.toFixed(2)}%</p>
                    <p className="text-sm text-gray-400">
                        {globalData.fechados} de {globalData.total} clientes fechados
                    </p>
                </div>
            </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Conversão por Usuário
        </h3>

        <div className="h-80">
          <Bar data={chartData} options={options} />
        </div>
      </div>

        </>
    );
}
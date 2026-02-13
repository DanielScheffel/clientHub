import { useConversaoPorUsuario } from "@/hooks/useKPIs";
import { Bar } from "react-chartjs-2";


export default function ConversaoPorUsuarioChart() {
    const { data, loading } = useConversaoPorUsuario();

    if(loading) return <p>Carregando...</p>

    const chartData = {
        labels: data.map((item) => item.nome),
        datasets: [
            {
                label: "Taxa de Conversão (%)",
                data: data.map((item) => Number(item.taxa_conversao ?? 0))
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    }

    return (
        <div className="h-80">
            <Bar data={chartData} options={options} />
        </div>
    )
}
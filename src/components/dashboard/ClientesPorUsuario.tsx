import { useClientesPorUsuario } from "@/hooks/useKPIs";
import { Chart as ChartJS, CategoryScale, Legend, LineElement, Tooltip, LinearScale, PointElement } from "chart.js";
import { Line } from "react-chartjs-2";


ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend)

export default function ClientesPorUsuarioChart() {
    const { data, loading } = useClientesPorUsuario();

    if(loading) return <p>Carregando....</p>

    console.log(data)

    const chartData = {
        labels: data.map((item) => item.nome),
        datasets: [
            {
                label: "Total de Clientes",
                data: data.map((item) => Number(item.total_clientes)),
                borderColor: "#3b82f6",
                backgroundColor: "#3b82f6",
                tension: 0.3,
            },
        ]
    }

    return (
        <div className="w-full h-100">
            <Line data={chartData} />
        </div>
    )

}
import { useClientesPorUsuario } from "@/hooks/useKpis";
import { Chart as ChartJS, BarElement, CategoryScale, Legend, LinearScale, Tooltip } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

export default function CadastrosDashboard() {
    const { data: usuarioData, loading: usuarioLoading } = useClientesPorUsuario();

    if(usuarioLoading) return <p>Carregando...</p>

    // console.log(usuarioData);

    const chartData = {
        labels: usuarioData.map((item) => item.nome),
        datasets: [
            {
                label: "Total de Clientes",
                data: usuarioData.map((item) => Number(item.total_clientes)),
                backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(255, 159, 64)'
                    ],
                borderWidth: 1,
            }
        ]
    }

    return (
        <div className="w-full h-100">
            <Bar data={chartData} />
        </div>
    )
}
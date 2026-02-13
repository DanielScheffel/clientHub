import { useClientesPorStatus } from "@/hooks/useKPIs";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from "chart.js";
import { Bar } from "react-chartjs-2";


ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function ClientesPorStatusChart() {
    const { data, loading } = useClientesPorStatus();

    if(loading) return <p>Carregando...</p>;

    const chartData = {
        labels: data.map((item) => item.status),
        datasets: [
            {
                label: 'Clientes por Status',
                data: data.map((item) => Number(item.total)),
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
            },
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Clientes Por Status</h3>
                    <div className="w-full h-100">
                        <Bar data={chartData} options={options} />
                    </div>
            </div>
        </div>
    )
}
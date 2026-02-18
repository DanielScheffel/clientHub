import { useClienteOrigem, useClientePorTipo, useClientesPorStatus, useClientesTotal, useConversaoGlobal } from "@/hooks/useKpis";
import { BarElement, CategoryScale, Legend, LinearScale, Tooltip, Chart as ChartJS } from "chart.js";
import { BriefcaseBusiness, Globe, Users } from "lucide-react";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

export default function OverviewDashboard() {
    const { data: totalData, loading: totalLoading } = useClientesTotal();
    const { data: globalData, loading: globalLoading } = useConversaoGlobal();
    const { data: origemData, loading: origemLoading } = useClienteOrigem();
    const { data: clienteData, loading: clienteLoading } = useClientesPorStatus();
    const { data: tipoData, loading: tipoLoading } = useClientePorTipo();

    if(totalLoading || globalLoading || origemLoading || clienteLoading || tipoLoading) return <p>Carregando...</p>
    if(!globalData) return null;

    const totalCliente = Number(totalData.resultado[0].total);
    const taxa = Number(globalData.taxa_conversao ?? 0);
    const porcentagem = Number(origemData?.percentual ?? 0);

    const chartData = {
        labels: clienteData.map((item) => item.status),
        datasets: [
            {
                label: "Clientes por status",
                data: clienteData.map((item) => Number(item.total)),
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

    const dataChart = {
        labels: tipoData.map((item) => item.tipo_cliente),
        datasets: [
            {
                label: "Tipo de Clientes",
                data: tipoData.map((item) => item.quantidade),
                backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                    ],
                borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                    ],
                borderWidth: 1,
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
                <div className="flex items-center justify-between gap-3 mb-3">
                    <div>
                        <h3 className="text-sm">Total de clientes</h3>
                        <p className="text-3xl font-bold text-blue-600 mb-1">
                            {totalCliente}
                        </p>
                        <p className="text-sm text-gray-400">
                            Clientes no sistema
                        </p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-100">
                        <Users className="w-6 h-6" style={{color: "oklch(48.8% 0.243 264.376)"}} />
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between gap-3 mb-3">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Taxa de Conversão</h3>
                            <p className="text-3xl font-bold text-blue-600 mb-1">{taxa.toFixed(2)}%</p>
                            <p className="text-sm text-gray-400">
                                {globalData.fechados} de {globalData.total} clientes fechados
                            </p>
                        </div>
                    <div className="p-3 rounded-lg bg-blue-100">
                        <BriefcaseBusiness className="w-6 h-6" style={{color: "oklch(48.8% 0.243 264.376)"}} />
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between gap-3 mb-3">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Taxa de Origem</h3>
                            <p className="text-3xl font-bold text-blue-600 mb-1">{porcentagem.toFixed(2)}%</p>
                            <p className="text-sm text-gray-400">
                                de clientes pelo {origemData?.origem}
                            </p>
                        </div>
                    <div className="p-3 rounded-lg bg-blue-100">
                        <Globe className="w-6 h-6" style={{color: "oklch(48.8% 0.243 264.376)"}} />
                    </div>
                </div>
            </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Clientes por Status</h3>
                <div className="w-full h-100">
                    <Bar data={chartData} options={options} />
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Clientes por Status</h3>
                <div className="w-full h-100">
                    <Bar data={dataChart} options={options} />
                </div>
            </div>
        </div>

        </>
    )
}
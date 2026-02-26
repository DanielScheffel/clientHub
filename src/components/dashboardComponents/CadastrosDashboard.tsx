import { useClientesMes, useClientesUltimosDias } from "@/hooks/kpisTempo";
import { useClienteFunil, useClientesPorUsuario, useConversaoUsuario } from "@/hooks/useKpis";
import { Chart as ChartJS, BarElement, CategoryScale, Legend, LinearScale, Tooltip } from "chart.js";
import { ArrowUp, ChartLine, Clock, TrendingUp } from "lucide-react";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const diasOptions = [7, 10, 15, 30];

export default function CadastrosDashboard() {
    const { data: usuarioData, loading: usuarioLoading } = useClientesPorUsuario();
    const { data: conversaoData, loading: conversaoLoading } = useConversaoUsuario();
    const { data: funilData, loading: funilLoading } = useClienteFunil();
    const { data: mesData, loading: mesLoading } = useClientesMes();
    const { total, dias, setDias, loading } = useClientesUltimosDias();

    if(usuarioLoading || conversaoLoading || funilLoading || mesLoading) return <p>Carregando...</p>

    if(!conversaoData || !mesData) return null;

    const { mes_atual, mes_anterior, percentual } = mesData.total;

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

    const dataFunil = {
        labels: funilData.map((item) => item.status_labels),
        datasets: [
            {
                label: "Clientes",
                data: funilData.map((item) => Number(item.total)),
                backgroundColor: [
                        'rgba(0, 245, 39, 0.5)',
                        'rgba(181, 78, 174, 0.5)',
                        'rgba(255, 0, 0, 0.5)',
                        'rgba(0, 255, 248, 0.5)',
                        'rgba(147, 0, 255, 0.5)'
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
                            <h3 className="text-sm">Funcionário(a) com mais fechamento</h3>
                            <p className="text-3xl font-bold text-blue-600 mb-1">
                                { conversaoData.nome }
                            </p>
                            <p className="text-sm text-gray-400">
                                { conversaoData.fechados } de { conversaoData.total } de clientes fechados
                            </p>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-100">
                            <ChartLine className="w-6 h-6" style={{color: "oklch(48.8% 0.243 264.376)"}} />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between gap-3 mb-3">
                        <div>
                            <h3 className="text-sm">Clientes no mês</h3>
                            <p className="text-3xl font-bold text-blue-600 mb-1">
                                { mes_atual }
                            </p>
                            {percentual !== null && (
                                <p
                                    className={percentual >= 0 ? "text-green-600" : "text-red-600"}
                                >
                                    {percentual}% em relação ao mês anterior
                                </p>
                            )}
                            <p className="text-sm text-gray-400">Mês anterior: {mes_anterior}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-100">
                            <TrendingUp className="w-6 h-6" style={{color: "oklch(48.8% 0.243 264.376)"}} />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between gap-3 mb-3">
                        <div>
                            <div className="flex gap-2 mb-4">
                                <Clock className="w-5 h-5" />
                                <h3 className="text-sm">Últimos dias</h3>
                            </div>
                            <p className="text-3xl font-bold text-blue-600 mb-1">
                                { loading ? "-" : total }
                            </p>
                            <div className="flex gap-2 mb-1">
                                {diasOptions.map(opcao => (
                                    <button
                                        key={opcao}
                                        onClick={() => setDias(opcao)}
                                        className={`px-3 py-1 rounded-md text-sm font-medium transition
                                            ${
                                                dias === opcao
                                                ? "bg-gray-400 text-white"
                                                : "bg-gray-600/30 hover:bg-white"
                                            }
                                        `}>{opcao}d</button>
                                ))}
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-100">
                            <ArrowUp className="w-6 h-6" style={{color: "oklch(48.8% 0.243 264.376)"}} />
                        </div>
                    </div>
                </div>
            </div>
        
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Clientes por Usuário</h3>
                <div className="w-full h-100">
                    <Bar data={chartData} options={options} />
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Clientes por Funil</h3>
                <div className="w-full h-100">
                    <Bar data={dataFunil} options={options} />
                </div>
            </div>
        </div>
        
        
        
        </>
    )
}
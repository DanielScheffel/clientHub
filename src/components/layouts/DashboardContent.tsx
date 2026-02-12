import { Globe, LayoutDashboard, Tags, UserPlus } from "lucide-react";
import { Button } from "../ui/button";
import ClientesPorStatusChart from "../dashboard/ClientesPorStatus";
import ClientesPorUsuarioChart from "../dashboard/ClientesPorUsuario";
import KPIConversaoChart from "../dashboard/KPIConversao";
import TempoPorStatusChart from "../dashboard/TempoPorStatus";
import type { KPIView } from "@/pages/Dashboard";
// import type { KPIView } from "./Layout";


interface DashboardContentProps {
    selectedKPI: KPIView;
    onKPIChange: (kpi: KPIView) => void;
}

const kpiOptions = [
    { id: 'overview' as KPIView, label: 'Visão Geral', icon: LayoutDashboard },
    { id: 'cadastros' as KPIView, label: 'Cadastros', icon: UserPlus },
    { id: 'categorias' as KPIView, label: 'Categorias', icon: Tags },
    { id: 'origem' as KPIView, label: 'Origem', icon: Globe }
]

export function DashboardContent({ selectedKPI, onKPIChange }: DashboardContentProps) {
    
    return (
        <div className="max-w-7x1 mx-auto p-3">
            <div className="bg-white rounded-lg border border-gray-200 p-2 mb-6 inline-flex gap-2">
                {kpiOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                        <Button 
                            key={option.id}
                            variant={selectedKPI === option.id ? "default" : "ghost"}
                            onClick={() => onKPIChange(option.id)}
                            className={selectedKPI === option.id ? 'bg-blue-600 hover:bg-blue-700' : ''}
                        >
                                <Icon className="w-4 h-4" />
                                <span className="font-medium">{option.label}</span>
                        </Button>
                    )
                })}
            </div>

            <div className="space-y-6">
                {selectedKPI === 'overview' && <ClientesPorStatusChart />}
                {selectedKPI === 'cadastros' && <ClientesPorUsuarioChart />}
                {selectedKPI === 'categorias' && <KPIConversaoChart />}
                {selectedKPI === 'origem' && <TempoPorStatusChart />}
            </div>
        </div>
    )
}
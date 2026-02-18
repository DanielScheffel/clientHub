import type { KPIView } from "@/pages/DashboardPage";
import { Globe, LayoutDashboard, Plus, Tags, UserPlus } from "lucide-react";
import { Button } from "../ui/button";
import OverviewDashboard from "../dashboardComponents/OverviewDashboard";
import CadastrosDashboard from "../dashboardComponents/CadastrosDashboard";
import CategoriasDashboard from "../dashboardComponents/CategoriasDashboard";
import OrigemDashboard from "../dashboardComponents/OrigemDashboard";


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
                {selectedKPI === 'overview' && <OverviewDashboard />}
                {selectedKPI === 'cadastros' && <CadastrosDashboard />}
                {selectedKPI === 'categorias' && <CategoriasDashboard />}
                {selectedKPI === 'origem' && <OrigemDashboard />}
            </div>

    
            <Button className="fixed top-20 right-6 bg-blue-600 hover:bg-blue-700 shadow-lg z-30">
                <Plus className="w-4 h-4" /> Novo Cliente
            </Button>
        </div>
    )
}
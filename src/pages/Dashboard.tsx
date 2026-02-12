// import { Button } from "@/components/ui/button";
// import { useAuth } from "../contexts/authContext";
// import ClientesPorStatusChart from "@/components/dashboard/ClientesPorStatus";
// import ClientesPorUsuarioChart from "@/components/dashboard/ClientesPorUsuario";
import { DashboardContent } from "@/components/layouts/DashboardContent";
import Layout from "@/components/layouts/Layout";
import { useState } from "react";

export type KPIView = 'overview' | 'cadastros' | 'categorias' | 'origem';


export default function Dashboard() {
    // const { logout } = useAuth();
    const [selectedKPI, setSelectedKPI] = useState<KPIView>('overview')

    return (
        <Layout>
            {/* <h1 className="text-2x1 font-bold p-1">Dashboard</h1> */}

            <DashboardContent selectedKPI={selectedKPI} onKPIChange={setSelectedKPI} />

            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lx shadow">
                    <h2 className="font-semibold mb-4">Clientes por Status</h2>
                    <ClientesPorStatusChart />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="bg-white p-6 rounded-lx shadow">
                    <h2 className="font-semibold mb-4">Clientes por Status</h2>
                    <ClientesPorUsuarioChart />
                </div>
            </div> */}
        </Layout>
    )
}
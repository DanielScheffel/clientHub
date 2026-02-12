import { useState, type ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./TopBar";
// import { DashboardContent } from "./DashboardContent";


interface Props {
    children: ReactNode;
}

// export type KPIView = 'overview' | 'cadastros' | 'categorias' | 'origem';

export default function Layout({children}: Props) {
    const [collapsed, setCollapsed] = useState(false);
    // const [selectedKPI, setSelectedKPI] = useState<KPIView>('overview')

    return (
        <div className="flex h-screen bg-muted/40">
            <Sidebar collapsed={collapsed} />

            <div className="flex flex-col flex-1">
                <Topbar onToggle={() => setCollapsed(!collapsed)} />
                    <main className="flex-1 p-6 overflow-auto">
                        {/* <DashboardContent selectedKPI={selectedKPI} onKPIChange={setSelectedKPI}/> */}
                        {children}
                    </main>
            </div>
        </div>
    )
}
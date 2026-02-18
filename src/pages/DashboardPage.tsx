// import { useAuth } from "@/contexts/authContext";

import { DashboardContent } from "@/components/layouts/DashboardContent";
import Layout from "@/components/layouts/Layout";
import { useState } from "react";
// import { useState } from "react";


export type KPIView = 'overview' | 'cadastros' | 'categorias' | 'origem';

export default function DashboardPage() {
    const [selectedKPI, setSelectedKPI] = useState<KPIView>('overview');

    return (
        <Layout>
            <DashboardContent selectedKPI={selectedKPI} onKPIChange={setSelectedKPI}/>
        </Layout>
    )
}
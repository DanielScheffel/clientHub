import { useState, type ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./TopBar";


interface Props {
    children: ReactNode;
}

export default function Layout({ children }: Props) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="flex h-screen bg-muted/40">
            <Sidebar collapsed={collapsed} />

            <div className="flex flex-col flex-1">
                <Topbar onToggle={() => setCollapsed(!collapsed)} />
                    <main className="flex-1 p-6 overflow-auto">
                        {children}
                    </main>
            </div>
        </div>
    )
}
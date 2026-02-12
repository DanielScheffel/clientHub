import { Import, LayoutDashboard, Settings, UserCheck, UserPlus, Users } from "lucide-react";
import { NavLink } from "react-router-dom";


interface Props {
  collapsed: boolean;
}

export default function Sidebar({ collapsed }: Props) {
    return (
        <aside className={`bg-white border-r transition-all duration-300 ${collapsed ? "w-16" : "w-64"} p-4`}>
            <h1 className={`font-bold text-blue-600 mb-8 ${collapsed && "hidden"}`}>
                ClientHub
            </h1>

            <nav className="space-y-2">
                <NavLink to="/dashboard" className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
                    <LayoutDashboard size={20} />
                    {!collapsed && "Dashboard"}
                </NavLink>

                <NavLink to="/clientes" className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
                    <Users size={20} />
                    {!collapsed && "Clientes"}
                </NavLink>

                <NavLink to="/cliente/cadastro" className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
                    <UserPlus size={20} />
                    {!collapsed && "Novo Cadastro"}
                </NavLink>

                <NavLink to="/usuarios" className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
                    <UserCheck size={20} />
                    {!collapsed && "Usuários"}
                </NavLink>

                <NavLink to="/usuario/cadastro" className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
                    <UserPlus size={20} />
                    {!collapsed && "Novo Usuário"}
                </NavLink>

                <NavLink to="/cliente/cadastro" className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
                    <Import size={20} />
                    {!collapsed && "Relatórios"}
                </NavLink>

                <NavLink to="/configuracoes" className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
                    <Settings size={20} />
                    {!collapsed && "Configurações"}
                </NavLink>
            </nav>
        </aside>

    )
}
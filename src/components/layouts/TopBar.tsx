import { Button } from "../ui/button";
import { Bell, Menu, User } from "lucide-react";

interface Props {
    onToggle: () => void;
}

export default function Topbar({ onToggle }: Props) {
    return (
        <header className="flex items-center justify-between bg-blue-400 border-b px-6 h-16">
            <Button variant="ghost" size="icon" onClick={onToggle}>
                <Menu />
            </Button>

            <div className="flex items-center gap-4">
                <Bell className="cursor-pointer" />
                <User className="cursor-pointer" />
            </div>
        </header>
    )
}
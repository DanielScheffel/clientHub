import { Menu, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  onToggle: () => void;
}

export default function Topbar({ onToggle }: Props) {
  return (
    <header className="flex items-center justify-between bg-white border-b px-6 h-16">
      <Button variant="ghost" size="icon" onClick={onToggle}>
        <Menu />
      </Button>

      <div className="flex items-center gap-4">
        <Bell className="cursor-pointer" />
        <User className="cursor-pointer" />
      </div>
    </header>
  );
}
import { Menu } from "lucide-react";

type HeaderBarProps = {
  onMenuClick?: () => void;
};

export function HeaderBar({ onMenuClick }: HeaderBarProps) {
  return (
    <header className="h-16 px-4 sm:px-6 bg-white shadow flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="md:hidden">
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-base sm:text-lg font-semibold">Tableau de bord</h1>
      </div>
      <div className="hidden sm:block text-sm text-gray-500">
        Bonjour, Alexandra 👋
      </div>
    </header>
  );
}
import { CalendarCheck2, Home, Settings, X } from "lucide-react";
import { NavLink } from "react-router-dom";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};
export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navItems = [
    { label: "Tableau de bord", icon: <Home className="w-4 h-4" />, to: "/" },
    { label: "Paramètres", icon: <Settings className="w-4 h-4" />, to: "/settings" },
  ];
  
  return (
    <>
    {/* Overlay mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}
    {/* Sidebar */}
     <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r shadow-sm z-50 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 md:flex`}
      >
        <div className="p-4 flex flex-col justify-between h-full">
          <div>
            <div className="flex justify-between items-center mb-8">
        <h1 className="flex items-center gap-2 text-xl font-bold mb-8 text-indigo-600"><CalendarCheck2/>Dayly</h1>
        <button className="md:hidden" onClick={onClose}>
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                  onClick={onClose}
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="text-xs text-gray-400 text-center">
            © {new Date().getFullYear()} Dayly
          </div>
        </div>
      </aside>
    </>
  );
}
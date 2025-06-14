import { CalendarCheck2, Home, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

export function Sidebar() {
    const navItems = [
    { label: "Tableau de bord", icon: <Home className="w-4 h-4" />, to: "/" },
    { label: "Paramètres", icon: <Settings className="w-4 h-4" />, to: "/settings" },
  ];
  
  return (
     <aside className="w-64 h-screen bg-white border-r shadow-sm p-4 hidden md:flex flex-col justify-between">
      <div>
        <h1 className="flex items-center gap-2 text-xl font-bold mb-8 text-indigo-600"><CalendarCheck2/>Dayly</h1>
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
    </aside>
  );
}
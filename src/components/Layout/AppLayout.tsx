import { Sidebar } from "./Sidebar";
import { HeaderBar } from "./HeaderBar";
import { Outlet } from "react-router";


export function AppLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <HeaderBar />
        <main className="flex-1 overflow-auto p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
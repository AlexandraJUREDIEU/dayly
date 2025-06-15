import { Sidebar } from "./Sidebar";
import { HeaderBar } from "./HeaderBar";
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router";
import { useState } from "react";


export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-1">
        <HeaderBar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-auto p-4 sm:p-6 bg-gray-100">
          <Toaster />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
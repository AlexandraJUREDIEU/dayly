import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { HeaderBar } from "./HeaderBar";


type Props = {
  children: ReactNode;
};

export function AppLayout({ children }: Props) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <HeaderBar />
        <main className="flex-1 overflow-auto p-6 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}
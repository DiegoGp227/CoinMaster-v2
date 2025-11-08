"use client";

import { useState } from "react";
import Sidebar from "../organisms/Sidebar";
import Header from "../organisms/Header";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Contenedor principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header onMenuClick={toggleSidebar} />

        {/* Contenido de la página */}
        <main className="flex-1 overflow-y-auto bg-[#171a20]">
            {children}
        </main>
      </div>
    </div>
  );
}

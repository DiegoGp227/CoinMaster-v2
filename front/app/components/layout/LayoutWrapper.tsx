"use client";

import { useState } from "react";
import Sidebar from "../organisms/Sidebar";
import Header from "../organisms/Header";
import { usePathname } from "next/navigation";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Si estamos en login o signup, no mostramos el layout general
  if (pathname === "/login" || pathname === "/signup") {
    return <main className="min-h-screen w-screen">{children}</main>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        pathname={pathname}
      />

      {/* Contenedor principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header onMenuClick={toggleSidebar} pathname={pathname} />

        {/* Contenido */}
        <main className="flex-1 overflow-y-auto bg-hard-gray">
          {children}
        </main>
      </div>
    </div>
  );
}

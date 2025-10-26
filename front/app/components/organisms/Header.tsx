"use client";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 h-16 bg-main-black border-b border-soft-gray/20 flex items-center px-4 lg:px-6">
      <div className="flex items-center justify-between w-full">
        {/* Botón menú hamburguesa (solo mobile) */}
        <button
          onClick={onMenuClick}
          className="lg:hidden text-main-white hover:text-soft-gray transition-colors p-2 -ml-2"
          aria-label="Abrir menú"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Título o breadcrumb */}
        <div className="flex-1 lg:flex-none">
          <h2 className="text-main-white font-semibold text-lg lg:text-xl ml-2 lg:ml-0">
            Dashboard
          </h2>
        </div>

        {/* Acciones del header (búsqueda, notificaciones, etc) */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Búsqueda (opcional, oculta en mobile pequeño) */}
          <div className="hidden md:flex items-center bg-soft-gray/20 rounded-lg px-3 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-soft-gray mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Buscar..."
              className="bg-transparent border-none outline-none text-main-white placeholder-soft-gray text-sm w-32 lg:w-48"
            />
          </div>

          {/* Notificaciones */}
          <button
            className="relative p-2 text-main-white hover:text-soft-gray transition-colors"
            aria-label="Notificaciones"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            {/* Badge de notificación */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Avatar (solo desktop, en mobile está en el sidebar) */}
          <div className="hidden lg:flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-soft-gray flex items-center justify-center text-main-white text-sm font-semibold">
              U
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

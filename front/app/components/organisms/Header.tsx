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
      </div>
    </header>
  );
}

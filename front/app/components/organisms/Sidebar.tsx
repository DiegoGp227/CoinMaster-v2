import GenericLink from "../atoms/GenericLink";
import { ImHome } from "react-icons/im";
import { IoMdSettings } from "react-icons/io";
import { FaTags } from "react-icons/fa";
import { BsPiggyBankFill } from "react-icons/bs";
import { GoAlertFill } from "react-icons/go";
import { BiSolidReport } from "react-icons/bi";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

export default function Sidebar({ isOpen, onClose, pathname }: SidebarProps) {
  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen bg-black border-r border-border
          transition-transform duration-300 ease-in-out z-50
          w-64 flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header del Sidebar */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          <h1 className="text-white font-bold text-xl">FynUp</h1>

          {/* Botón cerrar en mobile */}
          <button
            onClick={onClose}
            className="lg:hidden text-white hover:text-soft-gray transition-colors"
            aria-label="Cerrar menú"
          >
            <GiHamburgerMenu />
          </button>
        </div>

        {/* Contenido del Sidebar */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            <li>
              <GenericLink
                href="/"
                Icon={<ImHome />}
                text="Dashboard"
                active={pathname === "/"}
              />
            </li>
            <li>
              <GenericLink
                href="/transactions"
                Icon={<FaMoneyBillTransfer />}
                text="Transactions"
                active={pathname === "/transactions"}
              />
            </li>
            <li>
              <GenericLink
                href="/categories"
                Icon={<FaTags />}
                text="Categories"
                active={pathname === "/categories"}
              />
            </li>
            <li>
              <GenericLink
                href="/budgets"
                Icon={<BsPiggyBankFill />}
                text="Budgets"
                active={pathname === "/budgets"}
              />
            </li>
            <li>
              <GenericLink
                href="/debts"
                Icon={<GoAlertFill />}
                text="Debts"
                active={pathname === "/debts"}
              />
            </li>
            <li>
              <GenericLink
                href="/reports"
                Icon={<BiSolidReport />}
                text="Reports"
                active={pathname === "/reports"}
              />
            </li>
            <li>
              <GenericLink
                href="/settings"
                Icon={<IoMdSettings />}
                text="Settings"
                active={pathname === "/settings"}
              />
            </li>
          </ul>
        </nav>

        {/* Footer del Sidebar (Usuario) */}
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-hard-gray flex items-center justify-center text-white font-semibold">
              U
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">Usuario</p>
              <p className="text-soft-gray text-xs truncate">user@fynup.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

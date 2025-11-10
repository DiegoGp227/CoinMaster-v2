"use client";

import { useState, useMemo } from "react";
import AppTable from "@/src/table/AppTable";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  transactionsColumns,
  Transaction,
} from "../../columns/transactionsColumns";

type TransactionsTableProps = {
  initialData?: Transaction[];
};

export default function TransactionsTable({
  initialData = [],
}: TransactionsTableProps) {
  // TODO: Reemplazar con datos reales del API
  const [data, setData] = useState<Transaction[]>(
    initialData.length > 0
      ? initialData
      : [
          {
            id: 1,
            user_id: 1,
            category_id: 1,
            subcategory_id: 1,
            amount: 50000,
            type: "expense",
            description: "Compra del supermercado",
            date: "2025-01-15",
            created_at: "2025-01-15T10:00:00",
            updated_at: "2025-01-15T10:00:00",
            category_name: "Alimentación",
            subcategory_name: "Supermercado",
            category_color: "#FF6B6B",
            category_icon: "🛒",
          },
          {
            id: 2,
            user_id: 1,
            category_id: 2,
            subcategory_id: 3,
            amount: 1500000,
            type: "income",
            description: "Salario mensual",
            date: "2025-01-01",
            created_at: "2025-01-01T08:00:00",
            updated_at: "2025-01-01T08:00:00",
            category_name: "Salario",
            subcategory_name: "Sueldo",
            category_color: "#4ECDC4",
            category_icon: "💰",
          },
          {
            id: 3,
            user_id: 1,
            category_id: 3,
            subcategory_id: 5,
            amount: 30000,
            type: "expense",
            description: "Gasolina",
            date: "2025-01-10",
            created_at: "2025-01-10T15:30:00",
            updated_at: "2025-01-10T15:30:00",
            category_name: "Transporte",
            subcategory_name: "Combustible",
            category_color: "#FFD93D",
            category_icon: "⛽",
          },
        ]
  );

  const table = useReactTable({
    data,
    columns: transactionsColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  // Calcular totales
  const totals = useMemo(() => {
    const totalIncome = data
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = data
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    const balance = totalIncome - totalExpense;

    const formattedBalance = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(balance);

    return [null, null, null, null, formattedBalance, null];
  }, [data]);

  return (
    <div className="flex flex-col h-full">
      {/* Contenedor con scroll para la tabla */}
      <div className="flex-1 overflow-auto">
        <AppTable table={table} totals={totals} />
      </div>

      {/* Controles de paginación */}
      {table.getPageCount() > 1 && (
        <div className="flex items-center justify-between mt-4 px-2">
          <div className="flex gap-2">
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1 bg-main-blue text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-80 transition-all"
            >
              {"<<"}
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1 bg-main-blue text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-80 transition-all"
            >
              {"<"}
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1 bg-main-blue text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-80 transition-all"
            >
              {">"}
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1 bg-main-blue text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-80 transition-all"
            >
              {">>"}
            </button>
          </div>
          <span className="text-sm text-white">
            Página{" "}
            <strong>
              {table.getState().pagination.pageIndex + 1} de{" "}
              {table.getPageCount()}
            </strong>
          </span>
        </div>
      )}
    </div>
  );
}

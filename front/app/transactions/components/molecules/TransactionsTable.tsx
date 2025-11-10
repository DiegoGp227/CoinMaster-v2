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
} from "../../../../src/table/transactionsColumns";

export type TransactionsTableProps = {
  initialData: Transaction[];
};

export default function TransactionsTable({
  initialData = [],
}: TransactionsTableProps) {
  const [data] = useState<Transaction[]>(initialData);

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

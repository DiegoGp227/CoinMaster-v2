import { flexRender, Table } from "@tanstack/react-table";
import React from "react";
type AppTableProps<T> = {
  table: Table<T>;
  totals?: (number | string | React.ReactNode | null)[];
  totalsUp?: boolean;
};

function AppTable<T>({ table, totals, totalsUp = false }: AppTableProps<T>) {
  return (
    <table className="w-full border-collapse text-xl leading-6 overflow-x-auto">
      <thead className="bg-main-blue text-white">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="py-1 px-4 border-solid bg-soft-golden"
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="bg-main-gray border-solid">
        {/* Fila de totales */}
        {totals && totalsUp && (
          <tr className="bg-white text-black">
            {table.getFlatHeaders().map((header, index) => (
              <td
                key={header.id}
                className="py-3 px-4 text-center border-solid"
              >
                {index === 0
                  ? "Total:"
                  : totals[index - 1] !== null
                  ? totals[index - 1]
                  : ""}
              </td>
            ))}
          </tr>
        )}

        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            className="text-main-blue border-t-2 border-soft-golden border-solid"
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="text-center py-2 px-4">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}

        {/* Fila de totales */}
        {totals && !totalsUp && (
          <tr className="bg-soft-golden text-white">
            {table.getFlatHeaders().map((header, index) => (
              <td
                key={header.id}
                className="py-3 px-4 text-center border-solid"
              >
                {index === 0
                  ? "Total:"
                  : totals[index - 1] !== null
                  ? totals[index - 1]
                  : ""}
              </td>
            ))}
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default AppTable;

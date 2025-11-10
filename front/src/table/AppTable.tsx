import { flexRender, Table } from "@tanstack/react-table";
import React from "react";

type AppTableProps<T> = {
  table: Table<T>;
  totals?: (number | string | React.ReactNode | null)[];
  totalsUp?: boolean;
  totalsLabel?: string;
};

function AppTable<T>({
  table,
  totals,
  totalsUp = false,
  totalsLabel = "Total:",
}: AppTableProps<T>) {
  const renderTotalsRow = (isTop: boolean) => {
    if (!totals) return null;

    return (
      <tr
        className={
          isTop
            ? "bg-white text-white font-semibold"
            : "bg-soft-golden text-white font-semibold"
        }
      >
        {table.getFlatHeaders().map((header, index) => (
          <td key={header.id} className="py-3 px-4 text-center border-solid">
            {index === 0
              ? totalsLabel
              : totals[index - 1] !== null
              ? totals[index - 1]
              : ""}
          </td>
        ))}
      </tr>
    );
  };

  return (
    <table className="w-full border-collapse text-xl leading-6 overflow-x-auto">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="py-1 px-4 border-solid bg-soft-golden text-soft-gray group-hover:text-white  transition-all duration-500"
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
        {totalsUp && renderTotalsRow(true)}

        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            className="text-soft-gray group-hover:text-white border-t-2 border-soft-golden border-solid transition-all duration-500"
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="text-center py-2 px-4">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}

        {!totalsUp && renderTotalsRow(false)}
      </tbody>
    </table>
  );
}

export default AppTable;

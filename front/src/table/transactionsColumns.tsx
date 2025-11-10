"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Transaction = {
  id: number;
  user_id: number;
  category_id: number;
  subcategory_id: number;
  amount: number;
  type: "income" | "expense";
  description: string | null;
  date: string;
  created_at: string;
  updated_at: string;
  // Relaciones
  category_name?: string;
  subcategory_name?: string;
  category_color?: string;
  category_icon?: string;
};

export const transactionsColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "date",
    header: "Fecha",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      return date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    },
  },
  {
    accessorKey: "category_name",
    header: "Categoría",
    cell: ({ row }) => {
      const color = row.original.category_color;
      const icon = row.original.category_icon;
      const name = row.getValue("category_name") as string;

      return (
        <div className="flex items-center gap-2">
          {color && (
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: color }}
            />
          )}
          {icon && <span>{icon}</span>}
          <span>{name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "subcategory_name",
    header: "Subcategoría",
  },
  {
    accessorKey: "description",
    header: "Descripción",
    cell: ({ row }) => {
      const description = row.getValue("description") as string | null;
      return description || "-";
    },
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row }) => {
      const type = row.getValue("type") as "income" | "expense";
      return (
        <span
          className={`px-2 py-1 rounded-full text-sm font-medium ${
            type === "income"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {type === "income" ? "Ingreso" : "Gasto"}
        </span>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Monto",
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number;
      const type = row.original.type;
      const formatted = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
      }).format(amount);

      return (
        <span
          className={`font-semibold ${
            type === "income" ? "text-green-600" : "text-red-600"
          }`}
        >
          {type === "income" ? "+" : "-"} {formatted}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 justify-center">
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
            onClick={() => {
              // TODO: Implementar editar
              console.log("Editar:", row.original.id);
            }}
          >
            Editar
          </button>
          <button
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
            onClick={() => {
              // TODO: Implementar eliminar
              console.log("Eliminar:", row.original.id);
            }}
          >
            Eliminar
          </button>
        </div>
      );
    },
  },
];

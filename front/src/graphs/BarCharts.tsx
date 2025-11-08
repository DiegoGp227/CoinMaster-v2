"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ICategoryData } from "../dashboard/types/types";

interface IBarChartsProps {
  data: ICategoryData[];
}

// Colores neón vibrantes para las categorías
const COLORS = [
  "#ff073a", // rojo neón - deudas
  "#00d9ff", // cyan neón - metas
  "#ff006e", // rosa neón
  "#00ff41", // verde neón
  "#ffff00", // amarillo neón
  "#bf00ff", // púrpura neón
];

export default function BarCharts({ data }: IBarChartsProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="category" stroke="#ffffff" />
        <YAxis stroke="#ffffff" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#000000",
            border: "1px solid #374151",
            borderRadius: "5px",
            color: "#ffffff",
          }}
          labelStyle={{ color: "#ffffff" }}
          cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
        />
        <Bar dataKey="amount" fill="#3b82f6" radius={[8, 8, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { IIcomeExpenseData } from "../dashboard/types/types";

interface ILineChartsProps {
  data: IIcomeExpenseData[];
}

export default function LineCharts({ data }: ILineChartsProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorIncomes" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="name" stroke="#ffffff" />
        <YAxis stroke="#ffffff" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#000000",
            border: "1px solid #374151",
            borderRadius: "5px",
            color: "#ffffff",
          }}
          labelStyle={{ color: "#ffffff" }}
        />
        <Area
          type="monotone"
          dataKey="incomes"
          stroke="#ef4444"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorIncomes)"
        />
        <Area
          type="monotone"
          dataKey="expenses"
          stroke="#22c55e"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorExpenses)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

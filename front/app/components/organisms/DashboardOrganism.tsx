"use client";
import { useState } from "react";
import FilterDashboard from "../molecules/FilterDashboard";
import GeneralBalance from "../molecules/GeneralBalance";
import GraphicOrganism from "./GraphicOrganism";
export type FilterOption = "all" | "year" | "semester" | "quarter" | "month";

export default function DashboardOrganism() {
  const [filterDate, setFilterDate] = useState<FilterOption>("month");
  return (
    <>
      <FilterDashboard setFilterDate={setFilterDate} filterDate={filterDate} />
      <GeneralBalance />
      <GraphicOrganism />
      <div>
        <div>
          <h3 className="text-soft-gray">Goals</h3>
        </div>
        <div>
          <h3>Debts</h3>
        </div>
      </div>
    </>
  );
}

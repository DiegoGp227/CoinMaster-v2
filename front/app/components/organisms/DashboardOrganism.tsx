"use client";
import { useState } from "react";
import FilterDashboard from "../molecules/FilterDashboard";
import GeneralBalance from "../molecules/GeneralBalance";
import GraphicOrganism from "./GraphicOrganism";
export type FilterOption = "All" | "Year" | "Semester" | "Quarter" | "Month";

export default function DashboardOrganism() {
  const [filterDate, setFilterDate] = useState<FilterOption>("Month");
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

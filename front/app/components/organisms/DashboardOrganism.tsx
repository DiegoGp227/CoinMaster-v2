"use client";
import { useState } from "react";
import FilterDashboard from "../molecules/FilterDashboard";
import GeneralBalance from "../molecules/GeneralBalance";
import Graphic from "../molecules/Graphic";
export type FilterOption = "all" | "year" | "semester" | "quarter" | "month";

export default function DashboardOrganism() {
  const [filterDate, setFilterDate] = useState<FilterOption>("month");
  return (
    <>
      <FilterDashboard setFilterDate={setFilterDate} filterDate={filterDate} />
      <GeneralBalance />
      <Graphic title="Expenses by category" />
    </>
  );
}

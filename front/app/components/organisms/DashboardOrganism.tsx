"use client";
import { useState } from "react";
import FilterDashboard from "../molecules/FilterDashboard";
import GeneralBalance from "../molecules/GeneralBalance";
import GraphicOrganism from "./GraphicOrganism";
import GoalsandDebitsOrganism from "./GoalsandDebitsOrganism";
export type FilterOption = "All" | "Year" | "Semester" | "Quarter" | "Month";

export default function DashboardOrganism() {
  const [filterDate, setFilterDate] = useState<FilterOption>("Month");
  return (
    <>
      <FilterDashboard setFilterDate={setFilterDate} filterDate={filterDate} />
      <GeneralBalance />
      <GraphicOrganism />
      <GoalsandDebitsOrganism />
    </>
  );
}

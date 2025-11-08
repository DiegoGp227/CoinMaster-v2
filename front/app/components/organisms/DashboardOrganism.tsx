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
      <div className="flex justify-center my-4 gap-5 flex-wrap">
        <div className="bg-black w-[414px] h-[140px] rounded-[5px] border-2 hover:border-soft-gray hover:shadow-[0_0_10px_2px_rgba(156,163,175,0.3)] transition-all duration-500">
          <h3 className="text-soft-gray">Goals</h3>
        </div>
        <div className="bg-black w-[414px] h-[140px] rounded-[5px] border-2 hover:border-soft-gray hover:shadow-[0_0_10px_2px_rgba(156,163,175,0.3)] transition-all  duration-500">
          <h3 className="text-soft-gray">Debts</h3>
        </div>
      </div>
    </>
  );
}

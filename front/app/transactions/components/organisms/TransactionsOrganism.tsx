"use client";
import FilterDashboard from "@/app/components/molecules/FilterDashboard";
import { FilterOption } from "@/app/components/organisms/DashboardOrganism";
import { useState } from "react";
import { LuCross } from "react-icons/lu";

export default function TransactionsOrganism() {
  const [filterDate, setFilterDate] = useState<FilterOption>("Month");

  return (
    <>
      <FilterDashboard setFilterDate={setFilterDate} filterDate={filterDate} />
      <div className="flex justify-center">
        <button className="w-[320px] h-[140px] bg-black rounded-[5px] flex justify-center items-center border-2 hover:border-soft-gray hover:shadow-[0_0_10px_2px_rgba(156,163,175,0.3)] group transition-all duration-500 gap-3">
          <p className="text-white text-3xl">New Transaction</p>
          <LuCross className="text-white w-7 h-7" />
        </button>
      </div>
    </>
  );
}

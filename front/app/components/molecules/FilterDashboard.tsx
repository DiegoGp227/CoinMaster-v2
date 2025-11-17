import { LuCross } from "react-icons/lu";
import FilterButton from "../atoms/FilterButton";
import { FilterOption } from "../organisms/DashboardOrganism";
import { AiOutlinePlus } from "react-icons/ai";

interface IFilterDashboardProps {
  setFilterDate: React.Dispatch<React.SetStateAction<FilterOption>>;
  filterDate: string;
  newbutton?: boolean;
}

export default function FilterDashboard({
  setFilterDate,
  filterDate,
  newbutton,
}: IFilterDashboardProps) {
  return (
    <div
      className={`flex mx-10 gap-2 my-4 ${
        newbutton ? "justify-between" : "justify-end"
      }`}
    >
      {newbutton ? (
        <button
          className="flex justify-center items-center px-5 h-10 bg-black text-soft-gray rounded-4xl border-2 border-black hover:border-soft-gray hover:text-white hover:shadow-[0_0_10px_2px_rgba(156,163,175,0.3)] transition-all duration-500 gap-5 group
        "
        >
          New Transactions
          <AiOutlinePlus className="text-soft-gray  w-7 h-7 group-hover:text-white transition-all duration-500" />
        </button>
      ) : (
        ""
      )}

      <div>
        <FilterButton
          filterDate={filterDate}
          setFilterDate={setFilterDate}
          value="All"
        />
        <FilterButton
          filterDate={filterDate}
          setFilterDate={setFilterDate}
          value="Year"
        />
        <FilterButton
          filterDate={filterDate}
          setFilterDate={setFilterDate}
          value="Semester"
        />
        <FilterButton
          filterDate={filterDate}
          setFilterDate={setFilterDate}
          value="Quarter"
        />
        <FilterButton
          filterDate={filterDate}
          setFilterDate={setFilterDate}
          value="Month"
        />
      </div>
    </div>
  );
}

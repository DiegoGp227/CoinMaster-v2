import FilterButton from "../atoms/FilterButton";
import { FilterOption } from "../organisms/DashboardOrganism";

interface IFilterDashboardProps {
  setFilterDate: React.Dispatch<React.SetStateAction<FilterOption>>;
  filterDate: string;
}

export default function FilterDashboard({
  setFilterDate,
  filterDate,
}: IFilterDashboardProps) {
  return (
    <div className="flex justify-end mx-10 gap-2 my-4">
      <FilterButton
        filterDate={filterDate}
        setFilterDate={setFilterDate}
        value="all"
      />
      <FilterButton
        filterDate={filterDate}
        setFilterDate={setFilterDate}
        value="year"
      />
      <FilterButton
        filterDate={filterDate}
        setFilterDate={setFilterDate}
        value="semester"
      />
      <FilterButton
        filterDate={filterDate}
        setFilterDate={setFilterDate}
        value="quarter"
      />
      <FilterButton
        filterDate={filterDate}
        setFilterDate={setFilterDate}
        value="month"
      />
    </div>
  );
}

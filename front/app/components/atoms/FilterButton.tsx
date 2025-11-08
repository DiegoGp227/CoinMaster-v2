import { FilterOption } from "../organisms/DashboardOrganism";

interface IFilterButtonProps {
  setFilterDate: React.Dispatch<React.SetStateAction<FilterOption>>;
  filterDate: string;
  value: FilterOption;
}

export default function FilterButton({
  setFilterDate,
  filterDate,
  value,
}: IFilterButtonProps) {
  return (
    <button
      onClick={() => {
        setFilterDate(`${value}`);
      }}
      className={`w-24 h-10 bg-black text-soft-gray rounded-4xl border-2 border-black hover:border-soft-gray hover:text-white hover:shadow-[0_0_10px_2px_rgba(156,163,175,0.3)] transition-all duration-500  ${
        filterDate === `${value}` ? "border-soft-gray text-white shadow-[0_0_10px_2px_rgba(156,163,175,0.3)]" : ""
      }`}
    >
      {value}
    </button>
  );
}

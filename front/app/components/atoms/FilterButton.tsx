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
      className={`w-24 h-10 bg-black text-soft-gray rounded-4xl border-2 border-black hover:border-soft-gray hover:text-white transition duration-500 ${
        filterDate === `${value}` ? "border-soft-gray text-white" : ""
      }`}
    >
      {value}
    </button>
  );
}

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
      <button
        onClick={() => {
          setFilterDate("all");
        }}
        className={`w-24 h-10 bg-black text-white rounded-4xl border-2 border-black hover:border-soft-gray transition duration-500 ${
          filterDate === "all" ? "border-soft-gray" : ""
        }`}
      >
        All
      </button>
      <button
        onClick={() => {
          setFilterDate("year");
        }}
        className={`w-24 h-10 bg-black text-white rounded-4xl border-2 border-black hover:border-soft-gray transition duration-500 ${
          filterDate === "year" ? "border-soft-gray" : ""
        }`}
      >
        Year
      </button>
      <button
        onClick={() => {
          setFilterDate("semester");
        }}
        className={`w-24 h-10 bg-black text-white rounded-4xl border-2 border-black hover:border-soft-gray transition duration-500 ${
          filterDate === "semester" ? "border-soft-gray" : ""
        }`}
      >
        Semester
      </button>
      <button
        onClick={() => {
          setFilterDate("quarter");
        }}
        className={`w-24 h-10 bg-black text-white rounded-4xl border-2 border-black hover:border-soft-gray transition duration-500 ${
          filterDate === "quarter" ? "border-soft-gray" : ""
        }`}
      >
        Quarter
      </button>
      <button
        onClick={() => {
          setFilterDate("month");
        }}
        className={`w-24 h-10 bg-black text-white rounded-4xl border-2 border-black hover:border-soft-gray transition duration-500 ${
          filterDate === "month" ? "border-soft-gray" : ""
        }`}
      >
        Month
      </button>
    </div>
  );
}

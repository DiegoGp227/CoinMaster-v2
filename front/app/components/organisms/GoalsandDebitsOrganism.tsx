import { debtsProgressData, goalsProgressData } from "@/src/test/data";
import GrupProgressBar from "../molecules/GrupProgressBar";

export default function GoalsandDebitsOrganism() {
  return (
    <div className="flex justify-center my-4 gap-5 flex-wrap">
      <GrupProgressBar title="Goals" data={goalsProgressData} />
      <GrupProgressBar title="Debts" data={debtsProgressData} />
    </div>
  );
}

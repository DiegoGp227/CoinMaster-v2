import { IProgressData } from "@/src/dashboard/types/types";
import ProgressBar from "./ProgressBar";

interface IGrupProgressBarProps {
  title: string;
  data: IProgressData[];
}

export default function GrupProgressBar({
  title,
  data,
}: IGrupProgressBarProps) {
  return (
    <div className="bg-black w-[414px] rounded-[5px] border-2 hover:border-soft-gray hover:shadow-[0_0_10px_2px_rgba(156,163,175,0.3)] transition-all duration-500 p-5 flex flex-col items-center justify-start gap-5 group">
      <div className="flex justify-center">
        <h3 className="text-soft-gray text-3xl group-hover:text-white transition-all duration-500">
          {title}
        </h3>
      </div>
      {data.map((item, index) => (
        <ProgressBar
          key={index}
          text={item.text}
          current={item.current}
          target={item.target}
        />
      ))}
    </div>
  );
}

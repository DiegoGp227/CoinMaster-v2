import { ReactNode } from "react";

interface ITableDivProps {
  title: string;
  children: ReactNode;
}

export default function TableDiv({ children, title }: ITableDivProps) {
  return (
    <div className="flex justify-center my-4">
      <div className="w-[84%] h-[400px] bg-black justify-center rounded-[5px] p-5 border-2 hover:border-soft-gray hover:shadow-[0_0_10px_2px_rgba(156,163,175,0.3)] transition-all duration-500 group">
        <div className="flex justify-center mb-4">
          <p className="text-soft-gray text-2xl group-hover:text-white transition-all duration-500 group">
            {title}
          </p>
        </div>
        <div className="w-full h-[300px]">{children}</div>
      </div>
    </div>
  );
}

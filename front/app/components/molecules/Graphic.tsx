import { ReactNode } from "react";

interface IGraphicProps {
  title: string;
  children: ReactNode;
}

export default function Graphic({ title, children }: IGraphicProps) {
  return (
    <div className="flex justify-center my-4">
      <div className="w-[84%] h-[400px] bg-black justify-center rounded-[5px] p-5 border-2 hover:border-soft-gray transition-colors duration-500 group">
        <div className="flex justify-center mb-4">
          <p className="text-soft-gray text-2xl group-hover:text-white transition-colors duration-500 group">
            {title}
          </p>
        </div>
        <div className="w-full h-[300px]">{children}</div>
      </div>
    </div>
  );
}

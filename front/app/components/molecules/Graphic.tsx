interface IGraphicProps {
  title: string;
}

export default function Graphic({ title }: IGraphicProps) {
  return (
    <div className="flex justify-center my-4">
      <div className="w-[84%] h-[300px] bg-black justify-center rounded-[5px] p-5 border-2 hover:border-soft-gray transition-colors duration-500 group">
        <div className="flex justify-center">
          <p className="text-soft-gray text-2xl group-hover:text-white transition-colors duration-500 group">
            {title}
          </p>
        </div>
        <div></div>
      </div>
    </div>
  );
}

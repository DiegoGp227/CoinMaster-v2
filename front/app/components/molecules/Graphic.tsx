interface IGraphicProps {
  title: string;
}

export default function Graphic({ title }: IGraphicProps) {
  return (
    <div className="flex justify-center my-4">
      <div className="w-[84%] h-[300px] bg-black justify-center rounded-[5px] p-5">
        <div className="flex justify-center">
          <p className="text-white text-2xl">{title}</p>
        </div>
        <div></div>
      </div>
    </div>
  );
}

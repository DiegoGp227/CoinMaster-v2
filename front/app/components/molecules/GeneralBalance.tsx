export default function GeneralBalance() {
  return (
    <div className="flex justify-center gap-5 my-4 flex-wrap">
      <div className="w-[270px] h-[140px] bg-black rounded-[5px] flex flex-col justify-center items-center border-2 hover:border-soft-gray group transition-colors duration-500">
        <p className="text-5xl text-soft-gray group-hover:text-white transition-colors duration-500">
          Income
        </p>
        <p className="text-4xl text-income">2.000.000</p>
      </div>
      <div className="w-[270px] h-[140px] bg-black rounded-[5px] flex flex-col justify-center items-center border-2 hover:border-soft-gray group transition-colors duration-500">
        <p className="text-5xl text-soft-gray group-hover:text-white transition-colors duration-500">
          Expenses
        </p>
        <p className="text-4xl text-expense">1.300.000</p>
      </div>
      <div className="w-[270px] h-[140px] bg-black rounded-[5px] flex flex-col justify-center items-center border-2 hover:border-soft-gray group transition-colors duration-500">
        <p className="text-5xl text-soft-gray group-hover:text-white group-hover: group-hover:border-soft-gray transition-colors duration-500">
          Balance
        </p>
        <p className="text-4xl text-income">700.000</p>
      </div>
    </div>
  );
}

export default function GeneralBalance() {
  return (
    <div className="flex justify-center gap-5 my-4">
      <div className="w-[300px] h-[200px] bg-black rounded-[5px] flex flex-col justify-center items-center">
        <p className="text-5xl text-white">Income</p>
        <p className="text-4xl text-income">2.000.000</p>
      </div>
      <div className="w-[300px] h-[200px] bg-black rounded-[5px] flex flex-col justify-center items-center">
        <p className="text-5xl text-white">Expenses</p>
        <p className="text-4xl text-expense">1.300.000</p>
      </div>
      <div className="w-[300px] h-[200px] bg-black rounded-[5px] flex flex-col justify-center items-center">
        <p className="text-5xl text-white">Balance</p>
        <p className="text-4xl text-income">700.000</p>
      </div>
    </div>
  );
}

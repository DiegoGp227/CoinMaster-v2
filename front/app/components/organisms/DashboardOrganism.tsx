export default function DashboardOrganism() {
  return (
    <>
      <div className="flex justify-end mx-10">
        <button className="w-24 h-10 bg-black text-white rounded-4xl">
          All
        </button>
        <button className="w-24 h-10 bg-black text-white rounded-4xl">
          Year
        </button>
        <button className="w-24 h-10 bg-black text-white rounded-4xl">
          Semester
        </button>
        <button className="w-24 h-10 bg-black text-white rounded-4xl">
          Quarter
        </button>
        <button className="w-24 h-10 bg-black text-white rounded-4xl">
          Monthly
        </button>
      </div>
      <div className="flex justify-center gap-5 mt-8">
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
      <div className="flex justify-center gap-5 mt-8">
        <div className="w-[940px] h-[200px] bg-black justify-center rounded-[5px]">
          <div className="flex justify-between">
            <p className="text-white">Expenses by category</p>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}

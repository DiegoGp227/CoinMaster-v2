import { LuCross } from "react-icons/lu";

interface INewTransactionProps {
  setModalNewTransactions: () => void;
}

export default function NewTranssactions({
  setModalNewTransactions,
}: INewTransactionProps) {
  return (
    <div className="flex justify-center">
      <button
        onClick={setModalNewTransactions}
        className="w-[320px] h-[140px] bg-black rounded-[5px] flex justify-center items-center border-2 hover:border-soft-gray hover:shadow-[0_0_10px_2px_rgba(156,163,175,0.3)] group transition-all duration-500 gap-3 group"
      >
        <p className="text-soft-gray text-3xl group-hover:text-white">New Transaction</p>
        <LuCross className="text-white w-7 h-7" />
      </button>
    </div>
  );
}

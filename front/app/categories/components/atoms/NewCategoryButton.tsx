import { AiOutlinePlus } from "react-icons/ai";

export default function () {
  return (
    <button className="w-52 h-10 bg-black text-soft-gray rounded-4xl border-2 border-black hover:border-soft-gray hover:text-white hover:shadow-[0_0_10px_2px_rgba(156,163,175,0.3)] transition-all duration-500 group flex justify-center items-center gap-5">
      New categories
      <AiOutlinePlus className="text-soft-gray  w-7 h-7 group-hover:text-white transition-all duration-500" />
    </button>
  );
}

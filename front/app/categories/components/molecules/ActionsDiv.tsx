import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDeleteForever } from "react-icons/md";

export default function ActionDiv() {
  return (
    <div className="flex">
      <button>
        <MdOutlineDeleteForever className="text-soft-gray group-hover:text-white transition-all duration-500" />
      </button>
      <button>
        <AiOutlineEdit className="text-soft-gray group-hover:text-white transition-all duration-500" />
      </button>
    </div>
  );
}

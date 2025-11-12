import { currencies } from "@/src/data/data";
import Link from "next/link";
import { LuSend } from "react-icons/lu";

interface IFormSignUpProps {
  currency: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
}

export default function FormSignUp({ currency, setCurrency }: IFormSignUpProps) {
  return (
    <form
      action=""
      className="group border-2 border-soft-gray flex flex-col w-96 bg-hard-gray justify-center items-center p-5 gap-5 transition-colors duration-500
                           hover:border-white focus-within:border-white"
    >
      <h1 className="text-4xl font-bold text-soft-gray transition-colors duration-500 group-hover:text-white group-focus-within:text-white mb-5">
        Sign Up
      </h1>

      {/* Username */}
      <div className="group/field w-full flex flex-col items-center">
        <label
          htmlFor="username"
          className="text-soft-gray mb-1 transition-colors duration-500 group-focus-within/field:text-white group-hover/field:text-white"
        >
          User Name
        </label>
        <input
          id="username"
          type="text"
          className="px-2 py-2 bg-black text-white w-full h-11 rounded-[5px] border-2 border-soft-gray
                               hover:border-white focus:border-white focus:outline-none transition-colors duration-500"
        />
      </div>

      {/* Email */}
      <div className="group/field w-full flex flex-col items-center">
        <label
          htmlFor="email"
          className="text-soft-gray mb-1 transition-colors duration-500 group-focus-within/field:text-white group-hover/field:text-white"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          className="px-2 py-2 bg-black text-white w-full h-11 rounded-[5px] border-2 border-soft-gray
                               hover:border-white focus:border-white focus:outline-none transition-colors duration-500"
        />
      </div>

      {/* Password */}
      <div className="group/field w-full flex flex-col items-center">
        <label
          htmlFor="password"
          className="text-soft-gray mb-1 transition-colors duration-500 group-focus-within/field:text-white group-hover/field:text-white"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          className="px-2 py-2 bg-black text-white w-full h-11 rounded-[5px] border-2 border-soft-gray
                               hover:border-white focus:border-white focus:outline-none transition-colors duration-500"
        />
      </div>

      {/* Currency */}
      <div className="group/field w-full flex flex-col items-center">
        <label
          htmlFor="currency"
          className="text-soft-gray mb-1 transition-colors duration-500 group-focus-within/field:text-white group-hover/field:text-white"
        >
          Moneda
        </label>
        <select
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="px-2 py-2 bg-black text-white w-full h-11 rounded-[5px] border-2 border-soft-gray hover:border-white focus:border-white focus:outline-none transition-colors duration-500"
        >
          {currencies.map(({ code, name, symbol }) => (
            <option key={code} value={code}>
              {code} — {name} ({symbol})
            </option>
          ))}
        </select>
      </div>

      {/* Botón */}
      <button
        className="bg-black text-soft-gray w-[150px] h-11 border-2 border-soft-gray 
                             hover:border-white hover:text-white focus:border-white flex justify-center items-center gap-2 py-5 
                             transition-colors duration-500 mt-5"
      >
        Send
        <LuSend />
      </button>
      <Link
        href="/login"
        className="text-soft-gray font-bold hover:text-white transition-colors duration-500 group"
      >
        ¿Do you have an account? Log in
      </Link>
    </form>
  );
}

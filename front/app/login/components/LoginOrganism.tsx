import Link from "next/link";
import { LuSend } from "react-icons/lu";

export default function LoginOrganism() {
  return (
    <div className="flex justify-center items-center min-h-screen w-screen gap-5">
      <form
        action=""
        className="group border-2 border-soft-gray flex flex-col w-96 bg-hard-gray justify-center items-center p-10 gap-5 transition-colors duration-500
                   hover:border-white focus-within:border-white"
      >
        <h1 className="text-4xl font-bold text-soft-gray transition-colors duration-500 group-hover:text-white group-focus-within:text-white">
          Login
        </h1>

        {/* Email */}
        <div className="group/field flex flex-col items-center">
          <label
            htmlFor="email"
            className="text-soft-gray mb-1 transition-colors duration-500 group-focus-within/field:text-white group-hover/field:text-white"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            className="px-2 py-2 bg-black text-white w-[350px] h-11 rounded-[5px] border-2 border-soft-gray
                       hover:border-white focus:border-white focus:outline-none transition-colors duration-500"
          />
        </div>

        {/* Password */}
        <div className="group/field flex flex-col items-center">
          <label
            htmlFor="password"
            className="text-soft-gray mb-1 transition-colors duration-500 group-focus-within/field:text-white group-hover/field:text-white"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className="px-2 py-2 bg-black text-white w-[350px] h-11 rounded-[5px] border-2 border-soft-gray
                       hover:border-white focus:border-white focus:outline-none transition-colors duration-500"
          />
        </div>

        {/* Botón */}
        <button
          className="bg-black text-soft-gray w-[150px] h-11 border-2 border-soft-gray 
                     hover:border-white hover:text-white focus:border-white flex justify-center items-center gap-2 py-5 
                     transition-colors duration-500"
        >
          Send
          <LuSend />
        </button>
        <Link
          href="/signup"
          className="text-soft-gray font-bold hover:text-white transition-colors duration-500 group"
        >
          ¿Don't have an account? Create one
        </Link>
      </form>
    </div>
  );
}

"use client";

import { currencies } from "@/src/data/data";
import Link from "next/link";
import { LuSend } from "react-icons/lu";
import { IUserData } from "../types/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../schemas/schemas";

interface IFormSIgnUpProps {
  onSubmit: (data: IUserData) => void;
  isLoading?: boolean;
  apiError?: string | null;
}

export default function FormSignUp({
  onSubmit,
  isLoading,
  apiError,
}: IFormSIgnUpProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserData>({
    resolver: zodResolver(signupSchema),
  });

  return (
    <form
      action=""
      className="group border-2 border-soft-gray flex flex-col w-96 bg-hard-gray justify-center items-center p-5 gap-5 transition-colors duration-500
                           hover:border-white focus-within:border-white"
      onSubmit={handleSubmit(onSubmit)}
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
          {...register("username")}
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
        )}
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
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
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
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
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
          defaultValue="USD"
          className="px-2 py-2 bg-black text-white w-full h-11 rounded-[5px] border-2 border-soft-gray hover:border-white focus:border-white focus:outline-none transition-colors duration-500"
          {...register("currency")}
        >
          {errors.currency && (
            <p className="text-red-500 text-sm mt-1">
              {errors.currency.message}
            </p>
          )}
          {currencies.map(({ code, name, symbol }) => (
            <option key={code} value={code}>
              {code} — {name} ({symbol})
            </option>
          ))}
        </select>
      </div>

      {/* Error de API */}
      {apiError && (
        <div className="w-[350px] bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-md text-sm">
          {apiError}
        </div>
      )}

      {/* Botón */}
      <button
        className="bg-black text-soft-gray w-[150px] h-11 border-2 border-soft-gray 
                             hover:border-white hover:text-white focus:border-white flex justify-center items-center gap-2 py-5 
                             transition-colors duration-500 mt-5"
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Send"}
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

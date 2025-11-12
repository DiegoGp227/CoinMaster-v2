"use client";
import FormSignUp from "@/src/auth/form/FormLogin";
import { useState } from "react";

export default function SignUpOrganism() {
  const [currency, setCurrency] = useState("USD");

  return (
    <div className="flex justify-center items-center min-h-screen w-screen gap-5">
      <FormSignUp currency={currency} setCurrency={setCurrency} />
    </div>
  );
}

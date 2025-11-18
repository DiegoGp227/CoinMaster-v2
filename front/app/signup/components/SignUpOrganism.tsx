"use client"
import FormSignUp from "@/src/auth/form/FormSignUp";
import { useSignUp } from "@/src/auth/services/useSignUp";
import { IUserData } from "@/src/auth/types/types";
import { useRouter } from "next/navigation";

export default function SignUpOrganism() {
  const { error, isLoading, signUp } = useSignUp();

  const router = useRouter();

  const handleSignUp = async (data: IUserData) => {
    try {
      const response = await signUp(data);
      if (response) {
        console.log("Usuario registrado/logueado:", response);
        router.push("/");
      }
    } catch (err) {
      console.error("Error al registrar/loguear usuario:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-screen gap-5">
      <FormSignUp onSubmit={handleSignUp} isLoading={isLoading} apiError={error} />
    </div>
  );
}

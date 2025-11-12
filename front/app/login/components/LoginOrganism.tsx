"use client"
import FormLogin from "@/src/auth/form/FormLogin";
import { useLogin } from "@/src/auth/services/Login";
import { ICredentials } from "@/src/auth/types/types";
import { useRouter } from "next/navigation";

export default function LoginOrganism() {
  const { error, isLoading, login, logout } = useLogin();
  const router = useRouter();

  const handleLogin = async (data: ICredentials) => {
    try {
      const response = await login(data);
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
      <FormLogin onSubmit={handleLogin} isLoading={isLoading} apiError={error} />
    </div>
  );
}

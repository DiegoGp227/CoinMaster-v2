import { useCallback, useState } from "react";
import { IResposeAuth, IUserData } from "../types/types";
import { SignUpURL } from "@/src/shared/constants/urls";
import { postFetcher } from "@/utils/utils";

export function useSignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUp = useCallback(async (credentials: IUserData) => {
    setIsLoading(true);
    setError(null);

    try {
      const url = SignUpURL.toString();
      const response = await postFetcher<IResposeAuth>(
        url,
        {
          username: credentials.username,
          email: credentials.email,
          password: credentials.password,
          currency: credentials.currency,
        },
        "application/json"
      );

      if (response?.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("userInfo", JSON.stringify(response.userInfo));
      }

      return response;
    } catch (err: unknown) {
      let errorMessage = "Ocurrió un error inesperado. Inténtalo de nuevo.";

      if (err && typeof err === "object" && "response" in err) {
        const error = err as {
          response?: { status?: number; data?: { message?: string } };
          request?: unknown;
        };
        if (error.response) {
          switch (error.response.status) {
            case 401:
              errorMessage = "Credenciales incorrectas. Inténtalo de nuevo.";
              break;
            case 500:
              errorMessage = "Error del servidor. Inténtalo más tarde.";
              break;
            default:
              errorMessage = error.response.data?.message || errorMessage;
          }
        } else if (error.request) {
          errorMessage = "Error de conexión. Verifica tu conexión a internet.";
        }
      }

      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { signUp, isLoading, error };
}

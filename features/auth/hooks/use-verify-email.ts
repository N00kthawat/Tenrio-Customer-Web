import { useEffect, useRef, useState } from "react";
import { AuthService } from "@/services/auth/auth.service";

export type VerifyEmailStatus = "verifying" | "success" | "invalid" | "expired" | "used" | "unavailable" | "error" | "missing_token";

export function useVerifyEmail(token?: string) {
  const [status, setStatus] = useState<VerifyEmailStatus>("verifying");
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!token) {
      setStatus("missing_token");
      return;
    }

    if (hasFetched.current) return;
    hasFetched.current = true;

    async function verifyToken() {
      try {
        await AuthService.verifyEmail({ token: token as string });
        setStatus("success");
      } catch (err) {
        if (err instanceof Error) {
          switch (err.message) {
            case "expired": return setStatus("expired");
            case "used": return setStatus("used");
            case "invalid": return setStatus("invalid");
            case "unavailable": return setStatus("unavailable");
            default: return setStatus("error");
          }
        }
        setStatus("unavailable");
      }
    }

    verifyToken();
  }, [token]);

  return { status };
}

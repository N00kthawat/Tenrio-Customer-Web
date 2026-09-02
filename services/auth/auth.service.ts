import { apiClient } from "@/lib/api/client";
import { ApiError } from "@/lib/api/errors";
import { 
  RegisterRequest, 
  LoginRequest, 
  VerifyEmailRequest, 
  ForgotPasswordRequest, 
  ResetPasswordRequest,
  UserResponse
} from "./auth.types";

export const AuthService = {
  async register(data: RegisterRequest): Promise<void> {
    try {
      await apiClient.post("/v1/auth/register", data);
    } catch (err) {
      if (err instanceof ApiError) {
        throw new Error(err.message || "ไม่สามารถสร้างบัญชีได้ในขณะนี้ โปรดลองใหม่อีกครั้ง");
      }
      throw err;
    }
  },

  async verifyEmail(data: VerifyEmailRequest): Promise<void> {
    try {
      await apiClient.post("/v1/auth/verify-email", data);
    } catch (err) {
      if (err instanceof ApiError) {
        const errorMessage = String(err.message || "").toLowerCase();
        const errorCode = String(err.code || "").toLowerCase();
        
        if ([400, 401, 403, 422].includes(err.status)) {
          if (errorMessage.includes("expire") || errorCode.includes("expire")) throw new Error("expired");
          if (errorMessage.includes("used") || errorMessage.includes("already") || errorCode.includes("used")) throw new Error("used");
          throw new Error("invalid");
        }
        if (err.status === 409) throw new Error("used");
        if (err.status >= 500 || err.status === 0) throw new Error("unavailable");
        throw new Error("error");
      }
      throw new Error("unavailable");
    }
  },

  async login(data: LoginRequest): Promise<void> {
    try {
      await apiClient.post("/v1/auth/login", data, { credentials: "include" });
    } catch (err) {
      if (err instanceof ApiError) {
        const errorMessage = String(err.message || "").toLowerCase();
        const errorCode = String(err.code || "").toLowerCase();
        
        if (errorMessage.includes("verify") || errorMessage.includes("unverified") || errorCode.includes("verify")) {
          throw new Error("unverified");
        }
        throw new Error("invalid");
      }
      throw err;
    }
  },

  async getCurrentUser(): Promise<UserResponse> {
    try {
      return await apiClient.get<UserResponse>("/v1/auth/me", { credentials: "include" });
    } catch {
      throw new Error("session_failed");
    }
  },

  async logout(): Promise<void> {
    await apiClient.post("/v1/auth/logout", {}, { credentials: "include" });
  },

  async forgotPassword(data: ForgotPasswordRequest): Promise<void> {
    try {
      await apiClient.post("/v1/auth/forgot-password", data);
    } catch (err) {
      // Intentionally hide 400/404 errors for privacy to prevent enumeration
      if (err instanceof ApiError && (err.status >= 500 || err.status === 0)) {
        throw new Error("server_error");
      }
    }
  },

  async resetPassword(data: ResetPasswordRequest): Promise<void> {
    try {
      await apiClient.post("/v1/auth/reset-password", data);
    } catch (err) {
      if (err instanceof ApiError) {
        const errorMessage = String(err.message || "").toLowerCase();
        const errorCode = String(err.code || "").toLowerCase();
        
        if ([400, 401, 403, 422].includes(err.status)) {
          if (errorMessage.includes("expire") || errorCode.includes("expire")) throw new Error("expired");
          if (errorMessage.includes("used") || errorMessage.includes("already") || errorCode.includes("used")) throw new Error("used");
          throw new Error("invalid");
        }
        throw new Error("server_error");
      }
      throw new Error("server_error");
    }
  }
};

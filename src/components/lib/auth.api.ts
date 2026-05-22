import apiClient from "./apiClient";
import type { SignupSchema, LoginSchema } from "../../schemas/auth.schema";

// Response Types
export interface AuthTokenResponse {
	accessToken: string;
	refreshToken: string;
	expiresIn: number;
}

export interface SignupResponse {
	userId: string;
	email: string;
	message: string;
}

export interface VerifyOtpResponse {
	verified: boolean;
	message: string;
}

// ─── Auth API ─────
export const authApi = {
	/**
	 * Register a new user account.
	 */
	signup: (data: SignupSchema) =>
		apiClient.post<SignupResponse>("/auth/signup", data),

	login: (data: LoginSchema) =>
		apiClient.post<AuthTokenResponse>("/auth/login", data),

	verifyOtp: (email: string, otp: string) =>
		apiClient.post<VerifyOtpResponse>("/auth/verify-otp", { email, otp }),

	resendOtp: (email: string) =>
		apiClient.post<{ message: string }>("/auth/resend-otp", { email }),

	logout: () => apiClient.post<{ message: string }>("/auth/logout"),
};






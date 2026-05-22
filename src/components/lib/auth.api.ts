import apiClient from "./apiClient";
import type { SignupSchema, LoginSchema } from "../../schemas/auth.schema";

// ─── Response Types ───────────────────────────────────────────────────────────

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

// ─── Auth API ─────────────────────────────────────────────────────────────────

export const authApi = {
	/**
	 * Register a new user account.
	 */
	signup: (data: SignupSchema) =>
		apiClient.post<SignupResponse>("/auth/signup", data),

	/**
	 * Log in with email and password.
	 */
	login: (data: LoginSchema) =>
		apiClient.post<AuthTokenResponse>("/auth/login", data),

	/**
	 * Verify the 4-digit OTP sent to the user's email.
	 */
	verifyOtp: (email: string, otp: string) =>
		apiClient.post<VerifyOtpResponse>("/auth/verify-otp", { email, otp }),

	/**
	 * Resend the OTP verification email.
	 */
	resendOtp: (email: string) =>
		apiClient.post<{ message: string }>("/auth/resend-otp", { email }),

	/**
	 * Sign out the current session.
	 */
	logout: () => apiClient.post<{ message: string }>("/auth/logout"),
};








// import apiClient from "./apiClient";
// import type { SignupSchema, LoginSchema } from "../../schemas/auth.schema";

// export interface RegisterPayload {
// 	first_name: string;
// 	last_name: string;
// 	email: string;
// 	password: string;
// }

// export interface LoginPayload {
// 	email: string;
// 	password: string;
// }

// export interface VerifyOtpPayload {
// 	otp: string;
// }

// export interface ResendOtpPayload {
// 	email: string;
// }

// // ─── API response shapes ──────────────────────────────────────────────────────
// // Every endpoint wraps data in { success, message, data }

// export interface ApiResponse<T> {
// 	success: boolean;
// 	message: string;
// 	data: T;
// }

// // POST /admin/register
// export interface RegisterData {
// 	token: string;
// 	/** Note: API returns "opt" (typo for otp) */
// 	opt: number;
// }

// // POST /admin/login
// export interface LoginUser {
// 	id: number;
// 	first_name: string;
// 	last_name: string;
// 	email: string;
// 	email_verified_at: string | null;
// 	created_at: string;
// 	updated_at: string;
// }

// export interface LoginData {
// 	user: LoginUser;
// 	token: string;
// }

// // POST /admin/verify-otp
// export type VerifyOtpData = [];

// // POST /admin/resend-otp
// export interface ResendOtpData {
// 	opt: number;
// }
// // ─── Auth API ─────────────────────────────────────────────────────────────────

// export const authApi = {
// 	/**
// 	 * Register a new user account.
// 	 */
// 	register: (payload: RegisterPayload) =>
// 		apiClient.post<ApiResponse<RegisterData>>("/admin/register", payload),

// 	/**
// 	 * Log in with email + password.
// 	 * Returns the long-lived auth token and user profile.
// 	 */
// 	login: (payload: LoginPayload) =>
// 		apiClient.post<ApiResponse<LoginData>>("/admin/login", payload),

// 	/**
// 	 * Verify the OTP sent after registration.
// 	 * Requires Authorization: Bearer {token from register}.
// 	 * The token is passed explicitly so it doesn't rely on the
// 	 * interceptor (which only holds the post-login token).
// 	 */
// 	verifyOtp: (payload: VerifyOtpPayload, registrationToken: string) =>
// 		apiClient.post<ApiResponse<VerifyOtpData>>("/admin/verify-otp", payload, {
// 			headers: { Authorization: `Bearer ${registrationToken}` },
// 		}),

// 	/**
// 	 * Resend the OTP to the registered email.
// 	 * Also requires Authorization: Bearer {token from register}.
// 	 */
// 	resendOtp: (payload: ResendOtpPayload, registrationToken: string) =>
// 		apiClient.post<ApiResponse<ResendOtpData>>("/admin/resend-otp", payload, {
// 			headers: { Authorization: `Bearer ${registrationToken}` },
// 		}),

// 	/**
// 	 * Sign out the current session.
// 	 */
// 	logout: () => apiClient.post<{ message: string }>("/auth/logout"),
// };

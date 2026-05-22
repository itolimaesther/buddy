import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AuthUser {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	email_verified_at: string | null;
	created_at: string;
	updated_at: string;
}

interface AuthState {
	/**
	 * Long-lived login token — persisted to localStorage.
	 * Used by apiClient interceptor for all authenticated app requests.
	 */
	token: string | null;

	/**
	 * Authenticated user profile — persisted to localStorage.
	 */
	user: AuthUser | null;

	/**
	 * Short-lived token returned by /admin/register.
	 * Used ONLY to authorise /admin/verify-otp and /admin/resend-otp.
	 * NOT persisted — lost on page reload (user must re-register).
	 */
	registrationToken: string | null;

	/**
	 * Email captured during signup so the OTP page can display and
	 * forward it to /admin/resend-otp.
	 */
	registrationEmail: string;

	// ── Actions ──────────────────────────────────────────────────────────────
	setToken: (token: string) => void;
	setUser: (user: AuthUser) => void;
	setRegistrationToken: (token: string) => void;
	setRegistrationEmail: (email: string) => void;
	logout: () => void;
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useAuthStore = create<AuthState>()(
	devtools(
		persist(
			(set) => ({
				token: null,
				user: null,
				registrationToken: null,
				registrationEmail: "",

				setToken: (token) => set({ token }, false, "auth/setToken"),

				setUser: (user) => set({ user }, false, "auth/setUser"),

				setRegistrationToken: (registrationToken) =>
					set({ registrationToken }, false, "auth/setRegistrationToken"),

				setRegistrationEmail: (registrationEmail) =>
					set({ registrationEmail }, false, "auth/setRegistrationEmail"),

				logout: () =>
					set(
						{
							token: null,
							user: null,
							registrationToken: null,
							registrationEmail: "",
						},
						false,
						"auth/logout",
					),
			}),
			{
				name: "buddy-auth",
				// Only persist the post-login token + user.
				// registrationToken and registrationEmail are session-only.
				partialize: (state) => ({
					token: state.token,
					user: state.user,
				}),
			},
		),
		{ name: "AuthStore" },
	),
);

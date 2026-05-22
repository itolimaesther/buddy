import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

// Types 
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
	
	token: string | null;

	
	user: AuthUser | null;

	registrationToken: string | null;

	registrationEmail: string;

	// Actions
	setToken: (token: string) => void;
	setUser: (user: AuthUser) => void;
	setRegistrationToken: (token: string) => void;
	setRegistrationEmail: (email: string) => void;
	logout: () => void;
}

// Store──────

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
				partialize: (state) => ({
					token: state.token,
					user: state.user,
				}),
			},
		),
		{ name: "AuthStore" },
	),
);

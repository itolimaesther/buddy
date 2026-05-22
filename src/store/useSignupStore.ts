import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { SignupSchema } from "../schemas/auth.schema";
import type { SignupFormErrors } from "../types";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SignupState {
	form: SignupSchema;
	errors: SignupFormErrors;

	// ── Actions ──────────────────────────────────────────────────────────────
	setField: (field: keyof SignupSchema, value: string) => void;
	setErrors: (errors: SignupFormErrors) => void;
	clearError: (field: keyof SignupFormErrors) => void;
	reset: () => void;
}

// ─── Initial form ─────────────────────────────────────────────────────────────

const INITIAL_FORM: SignupSchema = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
};

// ─── Store ────────────────────────────────────────────────────────────────────

export const useSignupStore = create<SignupState>()(
	devtools(
		(set) => ({
			form: INITIAL_FORM,
			errors: {},

			setField: (field, value) =>
				set(
					(state) => ({
						form: { ...state.form, [field]: value },
						errors: { ...state.errors, [field]: undefined },
					}),
					false,
					`signup/setField/${field}`,
				),

			setErrors: (errors) => set({ errors }, false, "signup/setErrors"),

			clearError: (field) =>
				set(
					(state) => ({ errors: { ...state.errors, [field]: undefined } }),
					false,
					`signup/clearError/${field}`,
				),

			reset: () =>
				set({ form: INITIAL_FORM, errors: {} }, false, "signup/reset"),
		}),
		{ name: "SignupStore" },
	),
);

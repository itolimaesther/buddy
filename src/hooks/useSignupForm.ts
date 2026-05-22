import { useCallback } from "react";
import { signupSchema, type SignupSchema } from "../schemas/auth.schema";
import { useSignupStore } from "../store/useSignupStore";
import { isValidEmail } from "../components/lib/utils";
import { PASSWORD_MAX_LENGTH } from "../constants";
import type { SignupFormErrors } from "../types";

export function useSignupForm() {
	const form = useSignupStore((s) => s.form);
	const errors = useSignupStore((s) => s.errors);
	const setField = useSignupStore((s) => s.setField);
	const setErrors = useSignupStore((s) => s.setErrors);
	const reset = useSignupStore((s) => s.reset);

	const isEmailValid = isValidEmail(form.email);

	const isFormComplete =
		Boolean(form.firstName) &&
		Boolean(form.lastName) &&
		isEmailValid &&
    form.password.length >= 6;
  
  
  const isLoginComplete =
		isEmailValid &&
		form.password.length >= 6;

	/** Returns a stable onChange handler for a given field */
	const handleChange = useCallback(
		(field: keyof SignupSchema) => (e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value;
			if (field === "password" && value.length > PASSWORD_MAX_LENGTH) return;
			setField(field, value);
		},
		[setField],
	);

	/** Runs full Zod validation and writes errors to the store. Returns true if valid. */
	const validateAll = useCallback((): boolean => {
		const result = signupSchema.safeParse(form);

		if (result.success) {
			setErrors({});
			return true;
		}

		const fieldErrors: SignupFormErrors = {};
		result.error?.issues.forEach((err) => {
			const key = err.path[0] as keyof SignupFormErrors;
			if (!fieldErrors[key]) fieldErrors[key] = err.message;
		});

		setErrors(fieldErrors);
		return false;
	}, [form, setErrors]);

	return {
		form,
		errors,
		passwordLength: form.password.length,
		isEmailValid,
    isFormComplete,
    isLoginComplete,
		handleChange,
		validateAll,
		reset,
	};
}

// import { useCallback } from "react";
// import { signupSchema, type SignupSchema } from "../schemas/auth.schema";
// import { useSignupStore } from "../store/useSignupStore";
// import { isValidEmail } from "../components/lib/utils";
// import { PASSWORD_MAX_LENGTH } from "../constants";
// import type { SignupFormErrors } from "../types";

// export function useSignupForm() {
// 	const form = useSignupStore((s) => s.form);
// 	const errors = useSignupStore((s) => s.errors);
// 	const setField = useSignupStore((s) => s.setField);
// 	const setErrors = useSignupStore((s) => s.setErrors);
// 	const reset = useSignupStore((s) => s.reset);

// 	const isEmailValid = isValidEmail(form.email);

// 	const isFormComplete =
// 		Boolean(form.firstName) &&
// 		Boolean(form.lastName) &&
// 		isEmailValid &&
// 		form.password.length >= 6;

// 	const handleChange = useCallback(
// 		(field: keyof SignupSchema) => (e: React.ChangeEvent<HTMLInputElement>) => {
// 			const value = e.target.value;
// 			if (field === "password" && value.length > PASSWORD_MAX_LENGTH) return;
// 			setField(field, value);
// 		},
// 		[setField],
// 	);

// 	/**
// 	 * Validates the form with Zod and writes per-field errors to the store.
// 	 *
// 	 * FIX: `result.error` is NOT optional after `safeParse` returns
// 	 * `{ success: false }` — TypeScript narrows it to `ZodError`, never
// 	 * `undefined`. Using `?.` here was incorrect (and in strict mode would
// 	 * raise TS2779). We now use `.flatten().fieldErrors` which gives a clean
// 	 * `Record<field, string[]>` without any optional chaining needed.
// 	 */
// 	const validateAll = useCallback((): boolean => {
// 		const result = signupSchema.safeParse(form);

// 		if (result.success) {
// 			setErrors({});
// 			return true;
// 		}

// 		// After the guard above, TypeScript narrows result.error to ZodError —
// 		// always defined, so no `?.` needed or allowed.
// 		const flat = result.error.flatten().fieldErrors;

// 		const fieldErrors: SignupFormErrors = {
// 			firstName: flat.firstName?.[0],
// 			lastName: flat.lastName?.[0],
// 			email: flat.email?.[0],
// 			password: flat.password?.[0],
// 		};

// 		setErrors(fieldErrors);
// 		return false;
// 	}, [form, setErrors]);

// 	return {
// 		form,
// 		errors,
// 		passwordLength: form.password.length,
// 		isEmailValid,
// 		isFormComplete,
// 		handleChange,
// 		validateAll,
// 		reset,
// 	};
// }
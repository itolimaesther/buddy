import { useCallback } from "react";
import { signupSchema } from "../schemas/auth.schema";
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

	const isLoginComplete = isEmailValid && form.password.length >= 6;

	const handleChange = useCallback(
		(field: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value;
			if (field === "password" && value.length > PASSWORD_MAX_LENGTH) return;
			setField(field, value);
		},
		[setField],
	);

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

	const validateLogin = useCallback((): boolean => {
		const loginSchema = signupSchema.pick({ email: true, password: true });
		const result = loginSchema.safeParse(form);

		if (result.success) {
			setErrors({});
			return true;
		}

		const fieldErrors: SignupFormErrors = {};
		result.error?.issues.forEach((err) => {
			const key = err.path[0] as keyof SignupFormErrors;
			if (key === "email" || key === "password") {
				if (!fieldErrors[key]) fieldErrors[key] = err.message;
			}
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
		validateLogin, // Exposed here
		reset,
	};
}

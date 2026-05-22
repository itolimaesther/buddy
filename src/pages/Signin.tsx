import React from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Check } from "lucide-react";
import { AuthLayout } from "../components/layouts/AuthLayout";
import { Button, Input } from "../components/ui";
import { useSignupForm } from "../hooks/useSignupForm";
import { useAuthStore } from "../store/useAuthStore";
import { PASSWORD_MAX_LENGTH } from "../constants";

export const SigninFormPage: React.FC = () => {
	const navigate = useNavigate();
	const setRegistrationEmail = useAuthStore((s) => s.setRegistrationEmail);

	const {
		form,
		errors,
		passwordLength,
		isEmailValid,
    isFormComplete,
    isLoginComplete,
		handleChange,
		validateAll,
	} = useSignupForm();

	const handleSubmit = () => {
		if (!validateAll()) return;
		// Persist email so the OTP page can show it
		// setRegistrationEmail(form.email);
		navigate("/app/dashboard");
	};

	return (
		<AuthLayout>
			<h2 className="text-[22px] font-bold text-dark m-0 mb-1">
				Log in to your account
			</h2>
			<p className="text-[13px] text-gray500 m-0 mb-6">
				Proceed to create account and setup your organization
			</p>

			<div className="flex flex-col gap-3.5">
				<Input
					placeholder="Work email"
					icon={Mail}
					type="email"
					name="email"
					required
					value={form.email}
					onChange={handleChange("email")}
					error={errors.email}
					label={form.email ? "Email" : undefined}
					rightElement={
						isEmailValid && form.email ? (
							<Check
								size={16}
								className="text-green"
								aria-label="Valid email"
							/>
						) : null
					}
				/>

				<div>
					<Input
						placeholder="Password"
						icon={Lock}
						type="password"
						name="password"
						required
						value={form.password}
						onChange={handleChange("password")}
						error={errors.password}
						label={form.password ? "Password" : undefined}
					/>
					{form.password && (
						<p className="text-right text-[12px] text-gray400 mt-1 m-0">
							{passwordLength} / {PASSWORD_MAX_LENGTH}
						</p>
					)}
				</div>

				<Button
					fullWidth
					onClick={handleSubmit}
					disabled={!isLoginComplete}
					className="mt-1"
				>
					Login
				</Button>

				<p className="text-[12px] text-gray500 m-0 mt-1 text-center leading-relaxed">
					By clicking the button above, you agree to our{" "}
					<a href="#" className="text-primary hover:underline">
						Terms of Service
					</a>{" "}
					and{" "}
					<a href="#" className="text-primary hover:underline">
						Privacy Policy
					</a>
					.
				</p>

				<p className="text-[14px] text-gray600 m-0 mt-2 text-center">
					Already have an account?{" "}
					<a
						href="/app/signin"
						className="text-primary font-semibold hover:underline"
					>
						Login
					</a>
				</p>
			</div>
		</AuthLayout>
	);
};




// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Mail, Lock, AlertCircle } from "lucide-react";
// import { isAxiosError } from "axios";
// import { z } from "zod";
// import { AuthLayout } from "../components/layouts";
// import { Button, Input } from "../components/ui";
// import { authApi } from "../components/lib/auth.api";
// import { useAuthStore } from "../store";

// // ─── Inline schema (simple — no dedicated Zustand store needed for login) ─────

// const loginSchema = z.object({
// 	email: z.string().min(1, "Email is required").email("Enter a valid email"),
// 	password: z.string().min(1, "Password is required"),
// });

// type LoginForm = z.infer<typeof loginSchema>;
// type LoginErrors = Partial<Record<keyof LoginForm, string>>;

// // ─── Page ─────────────────────────────────────────────────────────────────────

// export const SigninFormPage: React.FC = () => {
// 	const navigate = useNavigate();
// 	const setToken = useAuthStore((s) => s.setToken);
// 	const setUser = useAuthStore((s) => s.setUser);

// 	const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
// 	const [errors, setErrors] = useState<LoginErrors>({});
// 	const [isLoading, setIsLoading] = useState(false);
// 	const [apiError, setApiError] = useState<string | null>(null);

// 	// ── Field change ─────────────────────────────────────────────────────────

// 	const handleChange =
// 		(field: keyof LoginForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
// 			setForm((prev) => ({ ...prev, [field]: e.target.value }));
// 			// Clear field error on change
// 			setErrors((prev) => ({ ...prev, [field]: undefined }));
// 			setApiError(null);
// 		};

// 	// ── Zod validation ───────────────────────────────────────────────────────

// 	const validate = (): boolean => {
// 		const result = loginSchema.safeParse(form);
// 		if (result.success) {
// 			setErrors({});
// 			return true;
// 		}
// 		// result.error is ZodError — always defined when success === false
// 		const flat = result.error.flatten().fieldErrors;
// 		setErrors({
// 			email: flat.email?.[0],
// 			password: flat.password?.[0],
// 		});
// 		return false;
// 	};

// 	// ── Submit → POST /admin/login ───────────────────────────────────────────

// 	const handleSubmit = async () => {
// 		if (!validate()) return;

// 		setIsLoading(true);
// 		setApiError(null);

// 		try {
// 			const { data: res } = await authApi.login({
// 				email: form.email,
// 				password: form.password,
// 			});

// 			// Persist login token + user profile in Zustand (also goes to localStorage)
// 			setToken(res.data.token);
// 			setUser(res.data.user);

// 			navigate("/app/dashboard");
// 		} catch (err) {
// 			if (isAxiosError(err)) {
// 				const msg = err.response?.data?.message as string | undefined;
// 				setApiError(msg ?? "Invalid credentials. Please try again.");
// 			} else {
// 				setApiError("An unexpected error occurred.");
// 			}
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	};

// 	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
// 		if (e.key === "Enter") handleSubmit();
// 	};

// 	// ── Render ───────────────────────────────────────────────────────────────

// 	return (
// 		<AuthLayout>
// 			<h2 className="text-[22px] font-bold text-dark m-0 mb-1">Welcome back</h2>
// 			<p className="text-[13px] text-gray500 m-0 mb-6">
// 				Sign in to your account to continue
// 			</p>

// 			<div className="flex flex-col gap-3.5">
// 				{/* API error banner */}
// 				{apiError && (
// 					<div className="flex items-center gap-2 px-4 py-3 rounded-[10px] bg-red/10 border border-red/30">
// 						<AlertCircle size={15} className="text-red shrink-0" />
// 						<p className="m-0 text-[13px] text-red">{apiError}</p>
// 					</div>
// 				)}

// 				{/* Email */}
// 				<Input
// 					label="Email address"
// 					placeholder="you@company.com"
// 					type="email"
// 					icon={Mail}
// 					name="email"
// 					required
// 					value={form.email}
// 					onChange={handleChange("email")}
// 					error={errors.email}
// 				/>

// 				{/* Password */}
// 				<div>
// 					<Input
// 						label="Password"
// 						placeholder="Enter your password"
// 						type="password"
// 						icon={Lock}
// 						name="password"
// 						required
// 						value={form.password}
// 						onChange={handleChange("password")}
// 						error={errors.password}
// 					/>
// 					<div className="flex justify-end mt-1.5">
// 						<a
// 							href="#"
// 							className="text-[12px] text-primary hover:underline font-medium"
// 						>
// 							Forgot password?
// 						</a>
// 					</div>
// 				</div>

// 				{/* Submit */}
// 				<Button
// 					fullWidth
// 					onClick={handleSubmit}
// 					disabled={isLoading}
// 					className="mt-1"
// 				>
// 					{isLoading ? "Signing in…" : "Sign in"}
// 				</Button>

// 				<p className="text-[14px] text-gray600 m-0 mt-2 text-center">
// 					Don't have an account?{" "}
// 					<a
// 						href="/signup"
// 						className="text-primary font-semibold hover:underline"
// 					>
// 						Create one
// 					</a>
// 				</p>
// 			</div>
// 		</AuthLayout>
// 	);
// };

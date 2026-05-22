import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Check } from "lucide-react";
import { AuthLayout } from "../components/layouts/AuthLayout";
import { Button, Input } from "../components/ui";
import { useSignupForm } from "../hooks/useSignupForm";
import { useAuthStore } from "../store/useAuthStore";
import { PASSWORD_MAX_LENGTH } from "../constants";

export const SignupFormPage: React.FC = () => {
	const navigate = useNavigate();
	const setRegistrationEmail = useAuthStore((s) => s.setRegistrationEmail);

	const {
		form,
		errors,
		passwordLength,
		isEmailValid,
		isFormComplete,
		handleChange,
		validateAll,
	} = useSignupForm();

	const handleSubmit = () => {
		if (!validateAll()) return;
		// Persist email so the OTP page can show it
		setRegistrationEmail(form.email);
		navigate("/verify-otp");
	};

	return (
		<AuthLayout>
			<h2 className="text-[22px] font-bold text-dark m-0 mb-1">
				Register your account
			</h2>
			<p className="text-[13px] text-gray500 m-0 mb-6">
				Proceed to create account and setup your organization
			</p>

			<div className="flex flex-col gap-3.5">
				<div className="grid grid-cols-2 gap-3">
					<Input
						placeholder="First Name"
						icon={User}
						name="firstName"
						required
						value={form.firstName}
						onChange={handleChange("firstName")}
						error={errors.firstName}
						label={form.firstName ? "FirstName" : undefined}
					/>
					<Input
						placeholder="Last Name"
						icon={User}
						name="lastName"
						required
						value={form.lastName}
						onChange={handleChange("lastName")}
						error={errors.lastName}
						label={form.lastName ? "LastName" : undefined}
					/>
				</div>

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
					disabled={!isFormComplete}
					className="mt-1"
				>
					Create account
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
// import { User, Mail, Lock, Check, AlertCircle } from "lucide-react";
// import { AuthLayout } from "../components/layouts/AuthLayout";
// import { Button, Input } from "../components/ui";
// import { useSignupForm } from "../hooks/useSignupForm";
// import { useAuthStore } from "../store/useAuthStore";
// import { PASSWORD_MAX_LENGTH } from "../constants";
// import { isAxiosError } from "axios";
// import { authApi } from "../components/lib/auth.api";

// export const SignupFormPage: React.FC = () => {
// 	const navigate = useNavigate();
// 	const setRegistrationToken = useAuthStore((s) => s.setRegistrationToken);
// 	const setRegistrationEmail = useAuthStore((s) => s.setRegistrationEmail);

// 	const [isLoading, setIsLoading] = useState(false);
// 	const [apiError, setApiError] = useState<string | null>(null);

// 	const {
// 		form,
// 		errors,
// 		passwordLength,
// 		isEmailValid,
// 		isFormComplete,
// 		handleChange,
// 		validateAll,
// 	} = useSignupForm();

// 	const handleSubmit = async () => {
// 		if (!validateAll()) return;

// 		setIsLoading(true);
// 		setApiError(null);

// 		try {
// 			const { data: res } = await authApi.register({
// 				first_name: form.firstName,
// 				last_name: form.lastName,
// 				email: form.email,
// 				password: form.password,
// 			});

// 			// Store the short-lived token (for OTP calls) and email in Zustand
// 			setRegistrationToken(res.data.token);
// 			setRegistrationEmail(form.email);

// 			navigate("/verify-otp");
// 		} catch (err) {
// 			if (isAxiosError(err)) {
// 				const msg = err.response?.data?.message as string | undefined;
// 				setApiError(msg ?? "Registration failed. Please try again.");
// 			} else {
// 				setApiError("An unexpected error occurred.");
// 			}
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	};

// 	return (
// 		<AuthLayout>
// 			<h2 className="text-[22px] font-bold text-dark m-0 mb-1">
// 				Register your account
// 			</h2>
// 			<p className="text-[13px] text-gray500 m-0 mb-6">
// 				Proceed to create account and setup your organization
// 			</p>

// 			<div className="flex flex-col gap-3.5">
// 				{/* API error banner */}
// 				{apiError && (
// 					<div className="flex items-center gap-2 px-4 py-3 rounded-[10px] bg-red/10 border border-red/30">
// 						<AlertCircle size={15} className="text-red shrink-0" />
// 						<p className="m-0 text-[13px] text-red">{apiError}</p>
// 					</div>
// 				)}

// 				<div className="grid grid-cols-2 gap-3">
// 					<Input
// 						placeholder="First Name"
// 						icon={User}
// 						name="firstName"
// 						required
// 						value={form.firstName}
// 						onChange={handleChange("firstName")}
// 						error={errors.firstName}
// 					/>
// 					<Input
// 						placeholder="Last Name"
// 						icon={User}
// 						name="lastName"
// 						required
// 						value={form.lastName}
// 						onChange={handleChange("lastName")}
// 						error={errors.lastName}
// 					/>
// 				</div>

// 				<Input
// 					placeholder="Work email"
// 					icon={Mail}
// 					type="email"
// 					name="email"
// 					required
// 					value={form.email}
// 					onChange={handleChange("email")}
// 					error={errors.email}
// 					rightElement={
// 						isEmailValid && form.email ? (
// 							<Check
// 								size={16}
// 								className="text-green"
// 								aria-label="Valid email"
// 							/>
// 						) : null
// 					}
// 				/>

// 				<div>
// 					<Input
// 						placeholder="Password"
// 						icon={Lock}
// 						type="password"
// 						name="password"
// 						required
// 						value={form.password}
// 						onChange={handleChange("password")}
// 						error={errors.password}
// 						label={form.password ? "Password" : undefined}
// 					/>
// 					{form.password && (
// 						<p className="text-right text-[12px] text-gray400 mt-1 m-0">
// 							{passwordLength} / {PASSWORD_MAX_LENGTH}
// 						</p>
// 					)}
// 				</div>

// 				<Button
// 					fullWidth
// 					onClick={handleSubmit}
// 					disabled={!isFormComplete || isLoading}
// 					className="mt-1"
// 				>
// 					{isLoading ? "Creating account…" : "Create account"}
// 				</Button>

// 				<p className="text-[12px] text-gray500 m-0 mt-1 text-center leading-relaxed">
// 					By clicking the button above, you agree to our{" "}
// 					<a href="#" className="text-primary hover:underline">
// 						Terms of Service
// 					</a>{" "}
// 					and{" "}
// 					<a href="#" className="text-primary hover:underline">
// 						Privacy Policy
// 					</a>
// 					.
// 				</p>

// 				<p className="text-[14px] text-gray600 m-0 mt-2 text-center">
// 					Already have an account?{" "}
// 					<a
// 						href="/app/signin"
// 						className="text-primary font-semibold hover:underline"
// 					>
// 						Login
// 					</a>
// 				</p>
// 			</div>
// 		</AuthLayout>
// 	);
// };
import React from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Check } from "lucide-react";
import { AuthLayout } from "../components/layouts/AuthLayout";
import { Button, Input } from "../components/ui";
import { useSignupForm } from "../hooks/useSignupForm";
import { PASSWORD_MAX_LENGTH } from "../constants";

export const SigninFormPage: React.FC = () => {
	const navigate = useNavigate();

	const {
		form,
		errors,
		passwordLength,
		isEmailValid,
		isLoginComplete,
		handleChange,
		validateLogin, // Changed from validateAll
	} = useSignupForm();

	const handleSubmit = (e?: React.FormEvent) => {
		if (e) e.preventDefault();

		// Only validate email and password fields for logging in
		if (!validateLogin()) return;

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

			{/* Wrapping in a form enables 'Enter' key submission */}
			<form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
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
					type="submit"
					fullWidth
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
					Don't have an account?{" "}
					<a
						href="/signup"
						className="text-primary font-semibold hover:underline"
					>
						Sign up
					</a>
				</p>
			</form>
		</AuthLayout>
	);
};

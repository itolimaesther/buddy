import React from "react";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import { AuthLayout } from "../components/layouts/AuthLayout";
import { Button } from "../components/ui/Button";

const GoogleIcon = () => (
	<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
		<path
			d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
			fill="#4285F4"
		/>
		<path
			d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
			fill="#34A853"
		/>
		<path
			d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
			fill="#FBBC05"
		/>
		<path
			d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
			fill="#EA4335"
		/>
	</svg>
);

export const SignupMethodPage: React.FC = () => {
	const navigate = useNavigate();

	return (
		<AuthLayout>
			<h2 className="text-[24px] font-bold text-dark m-0 mb-1.5">
				Register your account
			</h2>

			<div className="h-8" />

			<Button
				fullWidth
				variant="outline"
				onClick={() => navigate("/signup")}
				icon={<Mail size={18} className="text-gray600" />}
				className="mb-4"
			>
				Sign up with email
			</Button>

			<div className="flex items-center gap-3 my-1">
				<div className="flex-1 h-px bg-gray200" />
				<span className="text-[13px] text-gray400">or</span>
				<div className="flex-1 h-px bg-gray200" />
			</div>

			<Button
				fullWidth
				variant="outline"
				icon={<GoogleIcon />}
				className="mt-4"
			>
				Sign up with Google
			</Button>

			<div className="h-8" />

			<p className="text-[13px] text-gray500 m-0 text-center">
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

			<div className="h-7" />

			<p className="text-[14px] text-gray600 m-0 text-center">
				Already have an account?{" "}
				<a
					href="/signin"
					className="text-primary font-semibold hover:underline"
				>
					Login
				</a>
			</p>
		</AuthLayout>
	);
};

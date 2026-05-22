import React from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "../components/lib/utils";
import { AuthLayout } from "../components/layouts/AuthLayout";
import { Button } from "../components/ui/Button";
import { useOtpInput } from "../hooks/useOtpInput";
import { useAuthStore } from "../store";

export const VerifyOTPPage: React.FC = () => {
	const navigate = useNavigate();
	const registrationEmail = useAuthStore((s) => s.registrationEmail);
	const { digits, refs, isFilled, handleChange, handleKeyDown } = useOtpInput();

	const handleConfirm = () => {
		if (!isFilled) return;
		// TODO: call authApi.verifyOtp(registrationEmail, otpValue) here
		navigate("/verified");
	};

	return (
		<AuthLayout>
			<h2 className="text-[22px] font-bold text-dark m-0 mb-2.5">
				Verify your email
			</h2>
			<p className="text-[14px] text-gray500 m-0 mb-6 leading-relaxed">
				A four-digit OTP code has been sent to{" "}
				<span className="text-primary font-medium">
					{registrationEmail || "your email"}
				</span>
			</p>

			<div
				className="flex gap-3 mb-7"
				role="group"
				aria-label="One-time password"
			>
				{digits.map((digit, index) => (
					<input
						key={index}
						ref={refs[index]}
						type="text"
						inputMode="numeric"
						maxLength={1}
						value={digit}
						onChange={(e) => handleChange(index, e.target.value)}
						onKeyDown={(e) => handleKeyDown(index, e)}
						aria-label={`Digit ${index + 1}`}
						className={cn(
							"w-16 h-16 text-center text-[24px] font-bold text-dark",
							"border-2 rounded-xl outline-none font-sans transition-all duration-150",
							digit
								? "border-primary bg-primaryLight"
								: "border-gray200 bg-white",
						)}
					/>
				))}
			</div>

			<Button
				className="flex justify-center lg:w-50 w-full text-center"
				onClick={handleConfirm}
				disabled={!isFilled}
			>
				Confirm code
			</Button>

			<p className="text-[14px] text-gray600 m-0 mt-5 text-center">
				Didn't get the mail?{" "}
				<a href="#" className="text-primary font-semibold hover:underline">
					Resend
				</a>
			</p>
		</AuthLayout>
	);
};






// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { cn } from "../components/lib/utils";
// import { AuthLayout } from "../components/layouts/AuthLayout";
// import { Button } from "../components/ui/Button";
// import { useOtpInput } from "../hooks/useOtpInput";
// import { useAuthStore } from "../store";
// import { AlertCircle, CheckCircle2 } from "lucide-react";
// import { isAxiosError } from "axios";
// import { authApi } from "../components/lib/auth.api";

// export const VerifyOTPPage: React.FC = () => {
// 	const navigate = useNavigate();
// 	const registrationEmail = useAuthStore((s) => s.registrationEmail);
// 	const registrationToken = useAuthStore((s) => s.registrationToken);

// 	const [isVerifying, setIsVerifying] = useState(false);
// 	const [isResending, setIsResending] = useState(false);
// 	const [apiError, setApiError] = useState<string | null>(null);
// 	const [resendSuccess, setResendSuccess] = useState(false);

// 	const { digits, refs, isFilled, otpValue, handleChange, handleKeyDown } =
// 		useOtpInput();

// 	// ── Verify OTP ──────────────────────────────────────────────────────────────

// 	const handleConfirm = async () => {
// 		if (!isFilled || !registrationToken) return;

// 		setIsVerifying(true);
// 		setApiError(null);

// 		try {
// 			await authApi.verifyOtp({ otp: otpValue }, registrationToken);
// 			navigate("/verified");
// 		} catch (err) {
// 			if (isAxiosError(err)) {
// 				const msg = err.response?.data?.message as string | undefined;
// 				setApiError(msg ?? "Invalid OTP. Please try again.");
// 			} else {
// 				setApiError("An unexpected error occurred.");
// 			}
// 		} finally {
// 			setIsVerifying(false);
// 		}
// 	};

// 	// ── Resend OTP ──────────────────────────────────────────────────────────────

// 	const handleResend = async () => {
// 		if (!registrationToken || !registrationEmail || isResending) return;

// 		setIsResending(true);
// 		setApiError(null);
// 		setResendSuccess(false);

// 		try {
// 			await authApi.resendOtp({ email: registrationEmail }, registrationToken);
// 			setResendSuccess(true);
// 			// Auto-hide the success message after 4 s
// 			setTimeout(() => setResendSuccess(false), 4000);
// 		} catch (err) {
// 			if (isAxiosError(err)) {
// 				const msg = err.response?.data?.message as string | undefined;
// 				setApiError(msg ?? "Failed to resend OTP.");
// 			} else {
// 				setApiError("An unexpected error occurred.");
// 			}
// 		} finally {
// 			setIsResending(false);
// 		}
// 	};

// 	// ── Render ──────────────────────────────────────────────────────────────────

// 	return (
// 		<AuthLayout>
// 			<h2 className="text-[22px] font-bold text-dark m-0 mb-2.5">
// 				Verify your email
// 			</h2>
// 			<p className="text-[14px] text-gray500 m-0 mb-6 leading-relaxed">
// 				A four-digit OTP code has been sent to{" "}
// 				<span className="text-primary font-medium">
// 					{registrationEmail || "your email"}
// 				</span>
// 			</p>

// 			{/* API error */}
// 			{apiError && (
// 				<div className="flex items-center gap-2 px-4 py-3 mb-4 rounded-[10px] bg-red/10 border border-red/30">
// 					<AlertCircle size={15} className="text-red shrink-0" />
// 					<p className="m-0 text-[13px] text-red">{apiError}</p>
// 				</div>
// 			)}

// 			{/* Resend success */}
// 			{resendSuccess && (
// 				<div className="flex items-center gap-2 px-4 py-3 mb-4 rounded-[10px] bg-green/10 border border-green/30">
// 					<CheckCircle2 size={15} className="text-green shrink-0" />
// 					<p className="m-0 text-[13px] text-green">OTP resent successfully!</p>
// 				</div>
// 			)}

// 			{/* OTP inputs */}
// 			<div
// 				className="flex gap-3 mb-7"
// 				role="group"
// 				aria-label="One-time password"
// 			>
// 				{digits.map((digit, index) => (
// 					<input
// 						key={index}
// 						ref={refs[index]}
// 						type="text"
// 						inputMode="numeric"
// 						maxLength={1}
// 						value={digit}
// 						onChange={(e) => handleChange(index, e.target.value)}
// 						onKeyDown={(e) => handleKeyDown(index, e)}
// 						aria-label={`Digit ${index + 1}`}
// 						className={cn(
// 							"w-16 h-16 text-center text-[24px] font-bold text-dark",
// 							"border-2 rounded-xl outline-none font-sans transition-all duration-150",
// 							digit
// 								? "border-primary bg-primaryLight"
// 								: "border-gray200 bg-white",
// 						)}
// 					/>
// 				))}
// 			</div>

// 			<Button
// 				fullWidth
// 				onClick={handleConfirm}
// 				disabled={!isFilled || isVerifying}
// 			>
// 				{isVerifying ? "Verifying…" : "Confirm code"}
// 			</Button>

// 			<p className="text-[14px] text-gray600 m-0 mt-5 text-center">
// 				Didn't get the mail?{" "}
// 				<button
// 					type="button"
// 					onClick={handleResend}
// 					disabled={isResending}
// 					className="text-primary font-semibold hover:underline bg-none border-none cursor-pointer disabled:opacity-50 p-0"
// 				>
// 					{isResending ? "Resending…" : "Resend"}
// 				</button>
// 			</p>
// 		</AuthLayout>
// 	);
// };
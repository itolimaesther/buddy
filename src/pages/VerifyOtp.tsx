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



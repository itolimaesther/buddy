import React from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Check } from "lucide-react";
import { AuthLayout } from "../components/layouts";
import { Button } from "../components/ui";

export const EmailVerifiedPage: React.FC = () => {
	const navigate = useNavigate();

	return (
		<AuthLayout>
			<div className="text-center py-5">
				<div className="relative inline-block mb-6">
					<Mail size={56} className="text-gray400" aria-hidden="true" />
					<div
						aria-hidden="true"
						className="absolute -bottom-1 -right-2 bg-green rounded-full w-6 h-6 flex items-center justify-center border-2 border-white"
					>
						<Check size={13} className="text-white" strokeWidth={3} />
					</div>
				</div>

				<h2 className="text-[22px] font-bold text-dark m-0 mb-3">
					Email verified !
				</h2>
				<p className="text-[14px] text-gray500 m-0 mb-8 leading-relaxed">
					The verified email address will be associated with your account. Click
					the button below to continue.
				</p>

				<Button className="flex justify-center lg:w-50 w-full text-center items-center mx-auto" onClick={() => navigate("/app/dashboard")}>
					Continue
				</Button>
			</div>
		</AuthLayout>
	);
};

import React from "react";
import { Check, MessageCircle } from "lucide-react";
import { Logo } from "../../components/ui";
import { AUTH_FEATURES } from "../../constants";
import type { AuthLayoutProps } from "../../types";

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => (
	<div className="flex min-h-screen bg-gray50">
		{/* ── Left feature panel ── */}
		<aside className="flex-[0_0_50%] max-w-[690px] px-12 py-10 flex flex-col hidden md:flex">
			<Logo />

			<div className="flex-1 flex flex-col justify-center pb-16">
				<ul className="flex flex-col gap-7 list-none p-0 m-0">
					{AUTH_FEATURES.map((feature, index) => (
						<li key={index} className="flex gap-4 items-start">
							<div
								className={
									"w-[26px] h-[26px] rounded-full bg-primary shrink-0 mt-0.5 " +
									"flex items-center justify-center"
								}
							>
								<Check size={14} className="text-white" strokeWidth={3} />
							</div>
							<p className="text-gray600 text-[15px] leading-relaxed m-0">
								{feature}
							</p>
						</li>
					))}
				</ul>
			</div>

			<p className="text-gray400 text-xs m-0">
				© 2022 Revvex. All rights reserved
			</p>
		</aside>

		{/* ── Right form panel ── */}
		<main className="flex-1 bg-gray100 flex items-center justify-center px-8 py-10">
			<div className="bg-white rounded-xl px-11 py-10 w-full max-w-[489px] shadow-card">
				{children}
			</div>
		</main>

		{/* ── Floating help button ── */}
		<button
			type="button"
			aria-label="Get Help"
			className={
				"fixed bottom-6 right-6 bg-primary text-white border-none rounded-[50px] " +
				"px-5 py-3 font-semibold text-sm cursor-pointer " +
				"flex items-center gap-2 shadow-dropdown z-50 " +
				"hover:bg-primaryHover transition-colors duration-150"
			}
		>
			Get Help
			<MessageCircle size={16} />
		</button>
	</div>
);

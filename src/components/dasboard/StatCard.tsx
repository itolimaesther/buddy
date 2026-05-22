import React from "react";
import type { StatCard as StatCardType } from "../../types";

interface StatCardProps extends StatCardType {}

export const StatCard: React.FC<StatCardProps> = ({
	label,
	val,
	icon,
	iconBg,
	iconColor,
}) => (
	// Fixed: Responsive paddings applied to secure internal bounds
	<div className="bg-white rounded-[14px] p-4 sm:px-6 sm:py-5 shadow-card flex items-center justify-between">
		<div>
			{/* Fixed: Fluid typographic properties applied to value headers */}
			<p className="m-0 mb-1 text-[22px] sm:text-[28px] font-bold text-dark">
				{val}
			</p>
			<p className="m-0 text-[13px] text-gray400">{label}</p>
		</div>

		<div
			aria-hidden="true"
			className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-lg sm:text-xl shrink-0"
			style={{ background: iconBg, color: iconColor }}
		>
			{icon}
		</div>
	</div>
);

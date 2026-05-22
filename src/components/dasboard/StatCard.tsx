import React from "react";
import type { StatCard as StatCardType } from "../../types";

interface StatCardProps extends StatCardType {
  
}

export const StatCard: React.FC<StatCardProps> = ({
	label,
	val,
	icon,
	iconBg,
	iconColor,
}) => (
	<div className="bg-white rounded-[14px] px-6 py-5 shadow-card flex items-center justify-between">
		<div>
			<p className="m-0 mb-1 text-[28px] font-bold text-dark">{val}</p>
			<p className="m-0 text-[13px] text-gray400">{label}</p>
		</div>

		<div
			aria-hidden="true"
			className="w-11 h-11 rounded-full flex items-center justify-center text-xl shrink-0"
			style={{ background: iconBg, color: iconColor }}
		>
			{icon}
		</div>
	</div>
);

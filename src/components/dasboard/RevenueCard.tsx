import React from "react";
import { REVENUE_ITEMS } from "../../constants";

export const RevenueCard: React.FC = () => (
	<section className="bg-white rounded-[14px] p-5 shadow-card">
		<h3 className="m-0 mb-4 text-[15px] font-bold text-dark">Revenue</h3>

		{REVENUE_ITEMS.map(({ label, val, icon, color, bg }) => (
			<div
				key={label}
				className="flex items-center justify-between mb-3.5 last:mb-0"
			>
				<div>
					<p className="m-0 mb-0.5 text-[15px] font-bold text-dark">{val}</p>
					<p className="m-0 text-[11px] text-gray400">{label}</p>
				</div>

				<div
					aria-hidden="true"
					className="w-9 h-9 rounded-[10px] flex items-center justify-center text-[13px] font-bold shrink-0"
					style={{ background: bg, color }}
				>
					{icon}
				</div>
			</div>
		))}
	</section>
);

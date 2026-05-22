import React from "react";
import { Avatar } from "../../components/ui";
import { MEMBERS } from "../../constants";
import { TrendingUp } from "lucide-react";

export const PotentialMembers: React.FC = () => (
	<section className="bg-white rounded-[14px] p-6 shadow-card">
		<h3 className="m-0 mb-5 text-[16px] font-bold text-dark">
			Potential Members
		</h3>

		<div className="flex gap-5">
			{MEMBERS.map(({ name, handle, growth, image}, index) => (
				<div
					key={`${name}-${index}`}
					className="flex-1 flex flex-col items-center text-center border border-gray100 rounded-2xl p-3"
				>
					<Avatar src={image} size={48} />
					<p className="m-0 mt-2.5 mb-0.5 text-[12px] font-semibold text-dark">
						{name}
					</p>
					<p className="m-0 mb-1.5 text-[11px] text-gray400">{handle}</p>
					<span className="text-[11px] text-green font-semibold flex gap-2">
						<TrendingUp className="text-green" size={16} /> {growth}
					</span>
				</div>
			))}
		</div>
	</section>
);

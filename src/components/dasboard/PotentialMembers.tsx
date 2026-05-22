import React from "react";
import { Avatar } from "../../components/ui";
import { MEMBERS } from "../../constants";
import { TrendingUp } from "lucide-react";

export const PotentialMembers: React.FC = () => (
	<section className="bg-white rounded-[14px] p-4 sm:p-6 shadow-card">
		<h3 className="m-0 mb-5 text-[16px] font-bold text-dark">
			Potential Members
		</h3>

		{/* Fixed: Configured horizontal inline scrolling track behavior context on mobile to shield constraints */}
		<div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 md:overflow-x-visible snap-x scrollbar-none">
			{MEMBERS.map(({ name, handle, growth, image }, index) => (
				<div
					key={`${name}-${index}`}
					className="flex-1 flex flex-col items-center text-center border border-gray100 rounded-2xl p-3 min-w-[135px] md:min-w-0 snap-start bg-white"
				>
					<Avatar src={image} size={44} />
					<p className="m-0 mt-2.5 mb-0.5 text-[12px] font-semibold text-dark truncate w-full">
						{name}
					</p>
					<p className="m-0 mb-1.5 text-[11px] text-gray400 truncate w-full">
						{handle}
					</p>
					<span className="text-[11px] text-green font-semibold flex items-center gap-1 mt-auto">
						<TrendingUp className="text-green" size={14} /> {growth}
					</span>
				</div>
			))}
		</div>
	</section>
);

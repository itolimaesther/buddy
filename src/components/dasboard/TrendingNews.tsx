import React from "react";
import { NEWS_ITEMS } from "../../constants";

export const TrendingNewsCard: React.FC = () => (
	<section className="bg-white rounded-[14px] p-5 shadow-card">
		<h3 className="m-0 mb-4 text-[15px] font-bold text-dark">Trending News</h3>

		{NEWS_ITEMS.map(({ title, sub, image }) => (
			<article key={title} className="flex gap-3 mb-3.5 last:mb-0 items-start">
				<div
					aria-hidden="true"
					className={
						"w-12 h-10 rounded-lg bg-gray100 shrink-0 overflow-hidden " +
						"flex items-center justify-center text-lg"
					}
				>
					<img src={image} alt="trending image" />
				</div>
				<div>
					<p className="m-0 mb-0.5 text-[12px] font-semibold text-dark leading-snug">
						{title}
					</p>
					<p className="m-0 text-[11px] text-gray400">{sub}</p>
				</div>
			</article>
		))}
	</section>
);

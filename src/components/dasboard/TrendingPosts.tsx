import React from "react";
import { TRENDING_POSTS } from "../../constants";

export const TrendingPosts: React.FC = () => (
	<section className="bg-white rounded-[14px] p-4 sm:p-6 shadow-card">
		<h3 className="m-0 mb-4 text-[16px] font-bold text-dark">Trending Posts</h3>

		{/* Fixed: Transition layout columns automatically cleanly based on viewport widths */}
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			{TRENDING_POSTS.map(({ title, sub, likes, comments, shares }) => (
				<article
					key={title}
					className="border border-gray100 rounded-xl p-4 sm:p-[18px] flex flex-col justify-between"
				>
					<div>
						<h4 className="m-0 mb-2 text-[14px] font-bold text-dark leading-snug">
							{title}
						</h4>
						<p className="m-0 mb-3.5 text-[12px] text-gray500 leading-relaxed">
							{sub}
						</p>
					</div>

					<div className="flex gap-3.5" aria-label="Post engagement">
						<span className="text-[12px] text-gray500">❤️ {likes}</span>
						<span className="text-[12px] text-gray500">💬 {comments}</span>
						<span className="text-[12px] text-gray500">↗ {shares}</span>
					</div>
				</article>
			))}
		</div>
	</section>
);

import React from "react";
import {
	StatCard,
	OverviewChart,
	TrendingPosts,
	PotentialMembers,
	WatchlistCard,
	RevenueCard,
	TrendingNewsCard,
} from "../components/dasboard";
import { STAT_CARDS } from "../constants";

export const DashboardPage: React.FC = () => (
	<div className="flex gap-6 p-6">
		{/* ── Main column ── */}
		<main className="flex-1 flex flex-col gap-5 min-w-0">
			<div className="grid grid-cols-3 gap-4">
				{STAT_CARDS.map((card) => (
					<StatCard key={card.label} {...card} />
				))}
			</div>
			<OverviewChart />
			<TrendingPosts />
			<PotentialMembers />
		</main>

		{/* ── Right sidebar ── */}
		<aside className="w-[260px] shrink-0 flex flex-col gap-5">
			<WatchlistCard />
			<RevenueCard />
			<TrendingNewsCard />
		</aside>
	</div>
);

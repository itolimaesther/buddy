import React from "react";
import { MiniChart } from "./MiniChart";
import { WATCHLIST } from "../../constants";

export const WatchlistCard: React.FC = () => (
	<section className="bg-white rounded-[14px] p-5 shadow-card">
		<div className="flex justify-between items-center mb-4">
			<h3 className="m-0 text-[15px] font-bold text-dark">Watchlist</h3>
			<a
				href="#"
				className="text-[12px] text-primary font-semibold hover:underline"
			>
				VIEW ALL
			</a>
		</div>

		{WATCHLIST.map(({ sym, price, change, up }) => (
			<div
				key={sym}
				className="flex items-center justify-between py-3 border-b border-gray100 last:border-b-0"
			>
				<div>
					<div className="flex items-center gap-1.5">
						<span className="text-[14px] font-bold text-dark">{sym}</span>
						<span
							className={`text-[11px] ${up ? "text-green" : "text-red"}`}
							aria-label={up ? "Trending up" : "Trending down"}
						>
							{up ? "↑" : "↓"}
						</span>
					</div>
					<p className="m-0 mt-0.5 text-[13px] font-semibold text-dark">
						{price}
					</p>
					<p className={`m-0 text-[11px] ${up ? "text-green" : "text-red"}`}>
						{change}
					</p>
				</div>
				<MiniChart up={up} />
			</div>
		))}
	</section>
);

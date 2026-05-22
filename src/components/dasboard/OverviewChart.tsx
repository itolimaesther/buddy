import React, { useState } from "react";
import {
	Chart as ChartJS,
	BarElement,
	CategoryScale,
	LinearScale,
	Tooltip,
	type ChartOptions,
	type ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { cn } from "../lib/utils";
import { CHART_DATA, OVERVIEW_TABS } from "../../constants";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

type Tab = (typeof OVERVIEW_TABS)[number];

export const OverviewChart: React.FC = () => {
	const [activeTab, setActiveTab] = useState<Tab>(OVERVIEW_TABS[0]);

	const labels = CHART_DATA.map((d) => d.m);

	const data: ChartData<"bar"> = {
		labels,
		datasets: [
			{
				// Primary dataset — highlighted orange for JUN, gray otherwise
				data: CHART_DATA.map((d) => d.v),
				backgroundColor: CHART_DATA.map((d) =>
					d.m === "JUN" ? "#F97316" : "#E5E7EB",
				),
				hoverBackgroundColor: CHART_DATA.map((d) =>
					d.m === "JUN" ? "#EA6C0A" : "#D1D5DB",
				),
				borderRadius: 1,
				borderSkipped: false,
				barThickness: 12,
				categoryPercentage: 0.6,
				barPercentage: 1,
			},
			{
				// Secondary dataset — softer orange for JUN, lighter gray otherwise
				data: CHART_DATA.map((d) => Math.round(d.v * 0.6)),
				backgroundColor: CHART_DATA.map((d) =>
					d.m === "JUN" ? "#FDBA74" : "#F3F4F6",
				),
				hoverBackgroundColor: CHART_DATA.map((d) =>
					d.m === "JUN" ? "#FB923C" : "#E5E7EB",
				),
				borderRadius: 1,
				borderSkipped: false,
				barThickness: 12,
				categoryPercentage: 0.6,
				barPercentage: 1,
			},
		],
	};

	const options: ChartOptions<"bar"> = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: { display: false },
			tooltip: {
				backgroundColor: "#1F2937",
				titleColor: "#F9FAFB",
				bodyColor: "#F9FAFB",
				padding: 10,
				cornerRadius: 8,
				callbacks: {
					label: (ctx) =>
						` ${ctx.datasetIndex === 0 ? "Primary" : "Secondary"}: ${ctx.parsed.y}`,
				},
			},
		},
		scales: {
			x: {
				grid: { display: false },
				border: { display: false },
				ticks: {
					color: "#9CA3AF",
					font: { size: 11, family: "inherit" },
				},
			},
			y: {
				grid: { color: "#F3F4F6" },
				border: { display: false },
				ticks: {
					color: "#9CA3AF",
					font: { size: 11, family: "inherit" },
					stepSize: 200,
				},
				min: 0,
				max: 1000,
			},
		},
	};

	return (
		<section className="bg-white rounded-[14px] p-6 shadow-card">
			<div className="flex items-center justify-between mb-5">
				<h3 className="m-0 text-[16px] font-bold text-dark">Overview</h3>

				<div className="flex gap-2" role="tablist" aria-label="Portfolio tabs">
					{OVERVIEW_TABS.map((tab) => (
						<button
							key={tab}
							role="tab"
							aria-selected={activeTab === tab}
							onClick={() => setActiveTab(tab)}
							className={cn(
								"px-3.5 py-1.5 rounded-full border-none cursor-pointer",
								"text-[12px] font-semibold transition-colors duration-150",
								activeTab === tab
									? "bg-primary text-white"
									: "bg-transparent text-gray500 hover:bg-gray100",
							)}
						>
							{tab}
						</button>
					))}
				</div>
			</div>

			<div className="h-[200px] w-full">
				<Bar
					data={data}
					options={options}
					aria-label="Monthly overview grouped bar chart"
				/>
			</div>
		</section>
	);
};

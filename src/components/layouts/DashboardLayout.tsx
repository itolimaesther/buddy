import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { AppHeader } from "./AppHeader";

const ROUTE_TITLES: Record<string, string> = {
	"/app/dashboard": "My Portfolio",
	"/app/messages": "Messages",
	"/app/group": "My Group",
	"/app/analytics": "Analytics",
	"/app/pack": "Pack",
	"/app/settings": "Settings",
};

export const DashboardLayout: React.FC = () => {
	const { pathname } = useLocation();
	const title = ROUTE_TITLES[pathname] ?? "Dashboard";

	return (
		<div className="flex flex-col md:flex-row min-h-screen bg-gray50">
			<Sidebar />

			<div className="flex-1 flex flex-col overflow-auto min-w-0 pb-16 md:pb-0">
				<AppHeader title={title} />

				<main className="flex-1 overflow-x-hidden">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

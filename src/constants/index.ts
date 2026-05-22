import {
	Briefcase,
	Users,
	MessageSquare,
	BarChart2,
	Package,
	Settings,
  UserRoundPlus,
  TrendingUp,
} from "lucide-react";
import type {
	ChartDataPoint,
	WatchlistItem,
	RevenueItem,
	NewsItem,
	MemberItem,
	StatCard,
	Contact,
	ChatMessage,
} from "../types";
import AvatarImg2 from "../assets/avatar2.png"
import AvatarImg3 from "../assets/avatar3.png";
import AvatarImg4 from "../assets/avatar4.png";
import AvatarImg5 from "../assets/avatar5.png";
import TrendImg from "../assets/trend1.png";
import TrendImg2 from "../assets/trend2.png";

// ─── Sidebar nav ──────────────────────────────────────────────────────────────

export const NAV_ITEMS = [
	{
		id: "dashboard",
		path: "/app/dashboard",
		label: "My Portfolio",
		icon: Briefcase,
	},
	{ id: "group", path: "/app/group", label: "My Group", icon: Users },
	{
		id: "messages",
		path: "/app/messages",
		label: "Messages",
		icon: MessageSquare,
	},
	{
		id: "analytics",
		path: "/app/analytics",
		label: "Analytics",
		icon: BarChart2,
	},
	{ id: "pack", path: "/app/pack", label: "Pack", icon: Package },
	{ id: "settings", path: "/app/settings", label: "Settings", icon: Settings },
] as const;

//Auth 

export const AUTH_FEATURES = [
	"Track real-time overview of company's financial performance.",
	"Track created projects budget against actual revenue and expenses.",
	"Highlighted reports on budget deficit and surplus, accounting dimensions, balance sheets and real-time sales margin estimation.",
] as const;

export const PASSWORD_MAX_LENGTH = 15;

//Dashboard

export const OVERVIEW_TABS = [
	"Robbin Hood",
	"Amreitrade",
	"Fidelity",
	"Charles",
] as const;

export const CHART_DATA: ChartDataPoint[] = [
	{ m: "JAN", v: 600 },
	{ m: "FEB", v: 380 },
	{ m: "MAR", v: 420 },
	{ m: "APR", v: 440 },
	{ m: "MAY", v: 620 },
	{ m: "JUN", v: 860 },
	{ m: "JUL", v: 340 },
	{ m: "AUG", v: 310 },
	{ m: "SEP", v: 280 },
	{ m: "OCT", v: 320 },
	{ m: "NOV", v: 300 },
	{ m: "DEC", v: 580 },
];

export const STAT_CARDS: StatCard[] = [
	{
		label: "Total Channels",
		val: "51",
		icon: "🔗",
		iconBg: "#E0F7F3",
		iconColor: "#14B8A6",
	},
	{
		label: "New Members",
		val: "125",
		icon: "👥",
		iconBg: "#EDE9FE",
		iconColor: "#8B5CF6",
	},
	{
		label: "All Impressions",
		val: "789",
		icon: "📈",
		iconBg: "var(--color-primaryLight)",
		iconColor: "var(--color-primary)",
	},
];

export const WATCHLIST: WatchlistItem[] = [
	{ sym: "AAPL", price: "$142.90", change: "+0.47%", up: true },
	{ sym: "BPL", price: "$142.90", change: "-0.78%", up: false },
];

export const REVENUE_ITEMS: RevenueItem[] = [
	{
		label: "Recently Added Pages",
		val: "$4,000",
		icon: "f",
		color: "#1877F2",
		bg: "#EBF3FF",
	},
	{
		label: "Video Monetization",
		val: "$2,120",
		icon: "ig",
		color: "#C13584",
		bg: "#FDEEF7",
	},
	{
		label: "Community Buildup",
		val: "$1,752",
		icon: "in",
		color: "#0077B5",
		bg: "#E8F4FD",
	},
];

export const NEWS_ITEMS: NewsItem[] = [
	{
		title: "Russia & Ukraine War",
		sub: "Marketing is evolving. It's chang...",
		image: TrendImg,
	},
	{
		title: "Elon Musk bought Twitter",
		sub: "Twitter is the most useful social pl...",
		image: TrendImg2,
	},
	{
		title: "Fuel Crisis Everywhere",
		sub: "Due to covid situation in 2020 the...",
		image: TrendImg,
	},
];

export const MEMBERS: MemberItem[] = [
	{ name: "Wanda Parker", handle: "@ashking1234", growth: "10.3%", image: AvatarImg2 },
	{ name: "Terry Brown", handle: "@ashking1234", growth: "9.8%", image: AvatarImg3},
	{ name: "Lucas Holmes", handle: "@ashking1234", growth: "6.5%", image: AvatarImg4},
	{ name: "Janice Miller", handle: "@ashking1234", growth: "8.6%", image: AvatarImg5},
	{ name: "Terry Brown", handle: "@ashking1234", growth: "9.8%", image: AvatarImg2},
];

export const TRENDING_POSTS = [
	{
		title: "8 Upcoming Influencer Marketing Trends and Benefits",
		sub: "Marketing is evolving. It's changing from a one-way street to a two-way conversa...",
		likes: "260",
		comments: "234",
		shares: "123",
	},
	{
		title: "How Influencer Marketing Affects Consumer Buying Behavior",
		sub: "As influencer marketing continues to grow, consumers have been turning to their...",
		likes: "180",
		comments: "97",
		shares: "54",
	},
] as const;

// ─── Messages ─────────────────────────────────────────────────────────────────

export const CONTACTS: Contact[] = [
	{
		id: 1,
		name: "Lisa Roy",
		image: AvatarImg2,
		preview: "Hi, are you Available Tomorrow?",
		time: "10:35 AM",
		unread: 0,
		online: true,
	},
	{
		id: 2,
		name: "Jamie Taylor",
		image: AvatarImg3,
		preview: "Nice One, Will Do it tomorrow",
		time: "10:35 AM",
		unread: 8,
		online: false,
	},
	{
		id: 3,
		name: "Jason Roy",
		image: AvatarImg4,
		preview: "That's Great. I am Looking forward to having a great start.",
		time: "10:35 AM",
		unread: 0,
		online: false,
	},
	{
		id: 4,
		name: "Amy Frost",
		image: AvatarImg5,
		preview: "Hi, will you start working on the chat app right now?",
		time: "10:35 AM",
		unread: 0,
		online: false,
	},
	{
		id: 5,
		name: "Paul Wilson",
		image: AvatarImg2,
		preview: "See you tomorrow champ",
		time: "10:35 AM",
		unread: 0,
		online: false,
	},
	{
		id: 6,
		name: "Ana Williams",
		image: AvatarImg3,
		preview: "??",
		time: "10:35 AM",
		unread: 1,
		online: false,
	},
];

export const CHAT_MESSAGES: ChatMessage[] = [
	{
		id: 1,
		from: "other",
		text: "Hi David, have you got the project report pdf?",
		time: "10:35 AM",
	},
	{ id: 2, from: "me", text: "NO. I did not get it", time: "10:36 AM" },
	{
		id: 3,
		from: "other",
		text: "Ok, I will just sent it here. Plz be sure to fill the details by today end of the day.",
		time: "10:37 AM",
		yesterday: true,
	},
	{ id: 4, from: "other", type: "file", filename: "project_report.pdf" },
	{
		id: 5,
		from: "me",
		text: "Ok. Should I send it over email as well after filling the details.",
		time: "10:38 AM",
	},
	{
		id: 6,
		from: "other",
		text: "Ya. I'll be adding more team members to it.",
		time: "10:39 AM",
	},
	{ id: 7, from: "me", text: "OK", time: "10:40 AM" },
];

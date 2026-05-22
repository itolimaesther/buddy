// ─── Navigation ───────────────────────────────────────────────────────────────

export type Page =
	| "signup-method"
	| "signup-form"
	| "verify-otp"
	| "email-verified"
	| "dashboard"
	| "messages"
	| "group"
	| "analytics"
	| "pack"
	| "settings";

export type NavigateFn = (page: Page) => void;

// Auth 
export interface SignupFormData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export interface SigninFormData {
	email: string;
	password: string;
}

export interface SignupFormErrors {
	firstName?: string;
	lastName?: string;
	email?: string;
	password?: string;
}

// Contacts / Messages 
export interface Contact {
	id: number;
  name: string;
  image?: string;
	preview: string;
	time: string;
	unread: number;
	online: boolean;
}

export type MessageSender = "me" | "other";

export interface ChatMessage {
	id: number;
	from: MessageSender;
	text?: string;
	time?: string;
	type?: "file";
	filename?: string;
	yesterday?: boolean;
}

export type MessageType = "text" | "file";

export interface MessagePayload  {
	type?: MessageType;
	text?: string;

	filename?: string;
	fileSize?: number;
	mimeType?: string;
	fileUrl?: string;
};

//Dashboard
export interface ChartDataPoint {
	m: string;
	v: number;
}

export interface WatchlistItem {
	sym: string;
	price: string;
	change: string;
	up: boolean;
}

export interface RevenueItem {
	label: string;
	val: string;
	icon: string;
	color: string;
	bg: string;
}

export interface NewsItem {
	title: string;
  sub: string;
  image: string;
}

export interface MemberItem {
	name: string;
  handle: string;
  image: string;
	growth: string;
}

export interface StatCard {
	label: string;
	val: string;
	icon: string;
	iconBg: string;
	iconColor: string;
}

//UI Components

export type ButtonVariant = "primary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md";

export interface ButtonProps {
	children: React.ReactNode;
	variant?: ButtonVariant;
	onClick?: () => void;
	disabled?: boolean;
	fullWidth?: boolean;
	style?: React.CSSProperties;
	size?: ButtonSize;
	icon?: React.ReactNode;
	type?: "button" | "submit" | "reset";
	className?: string;
}

export interface InputProps {
	label?: string;
	placeholder?: string;
	type?: string;
	icon?: React.ComponentType<{ size?: number; className?: string }>;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	error?: string;
	hint?: string;
	rightElement?: React.ReactNode;
	name?: string;
	required?: boolean;
	className?: string;
}

export interface AvatarProps {
	src?: string;
	name?: string;
	size?: number;
	online?: boolean;
}

export interface BadgeProps {
	count?: number;
	color?: string;
}

// ─── Layout ───────────────────────────────────────────────────────────────────

export interface SidebarProps {
	active: Page;
	navigate: NavigateFn;
}

export interface AppHeaderProps {
	title: string;
}

export interface AuthLayoutProps {
	children: React.ReactNode;
}

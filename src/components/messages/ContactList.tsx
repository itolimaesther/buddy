import React from "react";
import { Search, Edit3, Check } from "lucide-react";
import { Avatar, Badge } from "../../components/ui";
import { cn } from "../lib/utils";
import type { Contact } from "../../types";
import AvatarImg from "../../assets/avatar1.png"

interface ContactListProps {
	contacts: Contact[];
	selectedId: number;
	searchQuery: string;
	onSelect: (id: number) => void;
	onSearchChange: (query: string) => void;
}

export const ContactList: React.FC<ContactListProps> = ({
	contacts,
	selectedId,
	searchQuery,
	onSelect,
	onSearchChange,
}) => (
	<aside
		className={
			"w-full shrink-0 border-r border-gray100 rounded-2xl bg-gray100/30 m-3 " +
			"flex flex-col overflow-hidden"
		}
		aria-label="Conversations"
	>
		{/* Current user header */}
		<div className="px-5 py-[18px]  flex items-center justify-between">
			<div className="flex items-center gap-2.5">
				<Avatar src={AvatarImg} size={40} />
				<div>
					<p className="m-0 text-[14px] font-bold text-primary">David Peters</p>
					<p className="m-0 text-[11px] text-gray400">Senior Developer</p>
				</div>
			</div>
			<button
				type="button"
				aria-label="New message"
				className="bg-none border-none cursor-pointer text-gray400 hover:text-gray600 p-1 rounded"
			>
				<Edit3 size={16} />
			</button>
		</div>

		{/* Search */}
		<div className="px-4 py-3">
			<label htmlFor="contact-search" className="sr-only">
				Search contacts
			</label>
			<div className="flex items-center gap-2 bg-white rounded-[10px] px-3 py-2">
				<Search size={14} className="text-gray400 shrink-0" />
				<input
					id="contact-search"
					type="search"
					placeholder="Search Here..."
					value={searchQuery}
					onChange={(e) => onSearchChange(e.target.value)}
					className={
						"border-none bg-transparent outline-none text-[13px] " +
						"text-gray600 font-sans w-full placeholder:text-gray400"
					}
				/>
			</div>
		</div>

		{/* Contact list */}
		<ul className="flex-1 overflow-y-auto scrollbar-thin list-none m-0 p-0">
			{contacts.map((contact) => {
				const isSelected = selectedId === contact.id;
				return (
					<li key={contact.id} className="py-2 px-3">
						<button
							type="button"
							onClick={() => onSelect(contact.id)}
							aria-current={isSelected ? "true" : undefined}
							className={cn(
								"w-full text-left flex gap-3 px-4 py-3 cursor-pointer",
								"border-l-[3px] transition-all duration-100 border-none",
								isSelected
									? "bg-white border-l-primary shadow-2xl rounded-2xl"
									: "bg-transparent border-l-transparent hover:bg-gray50",
							)}
							style={{
								borderLeftColor: isSelected
									? "var(--color-primary)"
									: "transparent",
							}}
						>
							<Avatar src={contact.image} size={40} online={contact.online} />
							<div className="flex-1 min-w-0">
								<div className="flex justify-between items-center">
									<span className="text-[13px] font-semibold text-primary">
										{contact.name}
									</span>
									<span className="text-[11px] text-gray400 shrink-0">
										{contact.time}
									</span>
								</div>
								<div className="flex justify-between items-center mt-0.5">
									<p className="m-0 text-[12px] text-gray500 truncate max-w-[160px]">
										{contact.preview}
									</p>
									{contact.unread > 0 ? (
										<Badge count={contact.unread} />
									) : (
										<Check
											size={12}
											className="text-primary rounded-full bg-gray200 shrink-0"
										/>
									)}
								</div>
							</div>
						</button>
					</li>
				);
			})}
		</ul>
	</aside>
);

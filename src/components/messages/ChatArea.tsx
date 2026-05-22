import React, { useEffect, useRef } from "react";
import {
	Search,
	Heart,
	Bell,
} from "lucide-react";
import { Avatar } from "../../components/ui/Avatar";
import type { Contact, ChatMessage } from "../../types";
import AvatarInf from "../../assets/avatar7.png"
import { FileBubble } from "./FileBubble";

interface ChatAreaProps {
	contact: Contact | undefined;
	messages: ChatMessage[];
}



export const ChatArea: React.FC<ChatAreaProps> = ({ contact, messages }) => {
	const endRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		endRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

  return (
			<div className="flex-1 flex flex-col overflow-hidden bg-gray100/40 rounded-2xl m-3">
				{/* Chat header */}
				<div
					className={
						"px-6 py-4 border-b border-gray100 " +
						"flex items-center justify-between shrink-0"
					}
				>
					<div className="flex items-center gap-3">
						<Avatar src={contact?.image} size={38} online />
						<span className="text-[15px] font-semibold text-dark">
							{contact?.name}
						</span>
					</div>

					<div className="flex gap-4 items-center">
						<button
							type="button"
							aria-label="Search messages"
							className="text-gray400 hover:text-gray600 cursor-pointer bg-none border-none p-0"
						>
							<Search size={18} />
						</button>
						<button
							type="button"
							aria-label="Like"
							className="text-gray400 hover:text-red cursor-pointer bg-none border-none p-0"
						>
							<Heart size={18} />
						</button>
						<button
							type="button"
							aria-label="Notifications"
							className="text-gray400 hover:text-gray600 cursor-pointer bg-none border-none p-0"
						>
							<Bell size={18} />
						</button>
					</div>
				</div>

				{/* Messages feed */}
				<ol
					className={
						"flex-1 overflow-y-auto scrollbar-thin " +
						"px-6 py-6 flex flex-col gap-4 list-none m-0"
					}
					aria-label="Messages"
				>
					{messages.map((msg) => {
						const isMe = msg.from === "me";

						return (
							<li key={msg.id}>
								{/* Date divider */}
								{msg.yesterday && (
									<div
										aria-label="Yesterday"
										className="flex items-center gap-3 my-2"
									>
										<div className="flex-1 h-px bg-gray200" />
										<span className="text-[12px] text-gray400 shrink-0">
											Yesterday
										</span>
										<div className="flex-1 h-px bg-gray200" />
									</div>
								)}

								{/* Bubble row */}
								<div
									className={`flex gap-2.5 items-end ${
										isMe ? "justify-end" : "justify-start"
									}`}
								>
									{!isMe && <Avatar src={contact?.image} size={30} />}

									<div>
										{msg.type === "file" ? (
											/* File attachment */
											<FileBubble msg={msg} isMe={isMe} />
										) : (
											// <div
											// 	className={
											// 		"bg-white border border-gray200 rounded-xl " +
											// 		"px-4 py-3 flex items-center gap-3 max-w-[240px]"
											// 	}
											// >
											// 	<div
											// 		className={
											// 			"w-10 h-12 rounded-md bg-gray100 flex items-center " +
											// 			"justify-center text-[11px] text-gray500 font-semibold"
											// 		}
											// 	>
											// 		PDF
											// 	</div>
											// 	<span className="text-[13px] text-dark font-medium truncate">
											// 		{msg.filename}
											// 	</span>
											// </div>
											/* Text bubble */
											<div
												className={`px-4 py-3 max-w-[320px] ${
													isMe
														? "bg-gray300/30 rounded-[16px_16px_4px_16px]"
														: "bg-white border border-gray200 rounded-[16px_16px_16px_4px]"
												}`}
											>
												<p
													className={`m-0 text-[14px] leading-relaxed ${
														isMe
															? "text-primary font-medium"
															: "text-dark font-normal"
													}`}
												>
													{msg.text}
												</p>
											</div>
										)}
									</div>

									{isMe && <Avatar src={AvatarInf} size={30} />}
								</div>
							</li>
						);
					})}
					<div ref={endRef} aria-hidden="true" />
				</ol>
			</div>
	);
};

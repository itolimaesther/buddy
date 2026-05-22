import React, { useState, useCallback, useRef } from "react";
import { Mic, Paperclip, Camera, Smile, Send } from "lucide-react";
import { useMessagesStore } from "../../store";

export const MessageInput: React.FC = () => {
	const [text, setText] = useState("");
	const sendMessage = useMessagesStore((s) => s.sendMessage);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleSend = useCallback(() => {
		const trimmed = text.trim();
		if (!trimmed) return;
		sendMessage(trimmed);
		setText("");
	}, [text, sendMessage]);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const localUrl = URL.createObjectURL(file);
		// Dispatch the file item metadata directly to the store
		sendMessage({
			type: "file",
			filename: file.name,
			fileUrl: localUrl,
		});

		// Clear input safely
		if (fileInputRef.current) fileInputRef.current.value = "";
	};

	return (
		<div className="px-6 py-4 bg-gray50 border-t border-gray200 shrink-0">
			<div className="flex items-center gap-3 bg-white border border-gray200 rounded-[14px] pl-4 pr-3 py-2">
				<input
					type="file"
					ref={fileInputRef}
					onChange={handleFileChange}
					className="hidden"
					id="chat-file-upload"
				/>
				<button
					type="button"
					aria-label="Voice message"
					className="text-gray400 hover:text-gray600 cursor-pointer bg-none border-none p-0 shrink-0"
				>
					<Mic size={18} />
				</button>

				<input
					type="text"
					placeholder="Write Something..."
					value={text}
					onChange={(e) => setText(e.target.value)}
					onKeyDown={handleKeyDown}
					aria-label="Message input"
					className="min-w-0 flex-1 border-none bg-transparent outline-none text-[14px] text-dark font-sans placeholder:text-gray400"
				/>

				<div className="flex items-center gap-2.5">
					<button
						type="button"
						onClick={() => fileInputRef.current?.click()}
						aria-label="Attach file"
						className="text-gray400 hover:text-gray600 cursor-pointer bg-none border-none p-0"
					>
						<Paperclip size={18} />
					</button>
					<button
						type="button"
						aria-label="Send image"
						className="text-gray400 hover:text-gray600 cursor-pointer bg-none border-none p-0"
					>
						<Camera size={18} />
					</button>
					<button
						type="button"
						aria-label="Emoji"
						className="text-gray400 hover:text-gray600 cursor-pointer bg-none border-none p-0"
					>
						<Smile size={18} />
					</button>
					<button
						type="button"
						onClick={handleSend}
						disabled={!text.trim()}
						aria-label="Send message"
						className="w-[38px] h-[38px] shrink-0 rounded-[10px] bg-primary border-none cursor-pointer flex items-center justify-center shrink-0 hover:bg-primaryHover transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<Send size={16} className="text-white" />
					</button>
				</div>
			</div>
		</div>
	);
};

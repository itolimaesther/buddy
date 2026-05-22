import React, { useState, useCallback, useRef } from "react";
import {
	Mic,
	Paperclip,
	Camera,
	Smile,
	Send,
	FileText,
	FileImage,
	FileArchive,
	File,
	X,
} from "lucide-react";
import { useMessagesStore } from "../../store";
import type { MessageType } from "../../types";



function formatFileSize(bytes: number): string {
	if (bytes < 1_024) return `${bytes} B`;
	if (bytes < 1_024 * 1_024) return `${(bytes / 1_024).toFixed(1)} KB`;
	return `${(bytes / (1_024 * 1_024)).toFixed(1)} MB`;
}

/** Resolve whether a MIME type is an image we can preview */
function isImage(mimeType: string): boolean {
	return mimeType.startsWith("image/");
}

/** Pick a Lucide icon component based on MIME type */
function FileIcon({
	mimeType,
	size = 18,
}: {
	mimeType: string;
	size?: number;
}) {
	if (mimeType.startsWith("image/")) return <FileImage size={size} />;
	if (mimeType.startsWith("application/zip") || mimeType.includes("compressed"))
		return <FileArchive size={size} />;
	if (
		mimeType.startsWith("text/") ||
		mimeType.includes("pdf") ||
		mimeType.includes("document")
	)
		return <FileText size={size} />;
	return <File size={size} />;
}

// ─── Attached file state shape ────────────────────────────────────────────────

interface AttachedFile {
	file: File;
	filename: string;
	fileSize: number;
	mimeType: string;
	/** Object URL for local preview — revoked on remove or unmount */
	previewUrl: string;
	type: MessageType;
}

export const MessageInput: React.FC = () => {
	// const [text, setText] = useState("");
	// const sendMessage = useMessagesStore((s) => s.sendMessage);

	// const handleSend = useCallback(() => {
	// 	const trimmed = text.trim();
	// 	if (!trimmed) return;
	// 	sendMessage(trimmed); // writes to Zustand store
	// 	setText("");
	// }, [text, sendMessage]);

	// const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
	// 	if (e.key === "Enter" && !e.shiftKey) {
	// 		e.preventDefault();
	// 		handleSend();
	// 	}
	// };

	// return (
	// 	<div className="px-6 py-4 bg-gray50 border-t border-gray200 shrink-0">
	// 		<div className="flex items-center gap-3 bg-white border border-gray200 rounded-[14px] pl-4 pr-3 py-2">
	// 			<button
	// 				type="button"
	// 				aria-label="Voice message"
	// 				className="text-gray400 hover:text-gray600 cursor-pointer bg-none border-none p-0 shrink-0"
	// 			>
	// 				<Mic size={18} />
	// 			</button>

	// 			<input
	// 				type="text"
	// 				placeholder="Write Something..."
	// 				value={text}
	// 				onChange={(e) => setText(e.target.value)}
	// 				onKeyDown={handleKeyDown}
	// 				aria-label="Message input"
	// 				className="flex-1 border-none bg-transparent outline-none text-[14px] text-dark font-sans placeholder:text-gray400"
	// 			/>

	// 			<div className="flex items-center gap-2.5">
	// 				<button
	// 					type="button"
	// 					aria-label="Attach file"
	// 					className="text-gray400 hover:text-gray600 cursor-pointer bg-none border-none p-0"
	// 				>
	// 					<Paperclip size={18} />
	// 				</button>
	// 				<button
	// 					type="button"
	// 					aria-label="Send image"
	// 					className="text-gray400 hover:text-gray600 cursor-pointer bg-none border-none p-0"
	// 				>
	// 					<Camera size={18} />
	// 				</button>
	// 				<button
	// 					type="button"
	// 					aria-label="Emoji"
	// 					className="text-gray400 hover:text-gray600 cursor-pointer bg-none border-none p-0"
	// 				>
	// 					<Smile size={18} />
	// 				</button>
	// 				<button
	// 					type="button"
	// 					onClick={handleSend}
	// 					disabled={!text.trim()}
	// 					aria-label="Send message"
	// 					className="w-[38px] h-[38px] rounded-[10px] bg-primary border-none cursor-pointer flex items-center justify-center shrink-0 hover:bg-primaryHover transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
	// 				>
	// 					<Send size={16} className="text-white" />
	// 				</button>
	// 			</div>
	// 		</div>
	// 	</div>
  // );
  
  const [text, setText] = useState("");
	const [attachedFile, setAttachedFile] = useState<AttachedFile | null>(null);

	const sendMessage = useMessagesStore((s) => s.sendMessage);

	// Separate refs so Paperclip accepts all files and Camera accepts images only
	const fileInputRef = useRef<HTMLInputElement>(null);
	const imageInputRef = useRef<HTMLInputElement>(null);

	// ── File selection ──────────────────────────────────────────────────────────

	const handleFileSelect = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.[0];
			if (!file) return;

			// Revoke previous object URL to avoid memory leaks
			if (attachedFile) URL.revokeObjectURL(attachedFile.previewUrl);

			setAttachedFile({
				file,
				filename: file.name,
				fileSize: file.size,
				mimeType: file.type,
				previewUrl: URL.createObjectURL(file),
				type: isImage(file.type) ? "image" : "file",
			});

			// Reset the input so the same file can be re-selected after removal
			e.target.value = "";
		},
		[attachedFile],
	);

	const handleRemoveFile = useCallback(() => {
		if (attachedFile) URL.revokeObjectURL(attachedFile.previewUrl);
		setAttachedFile(null);
	}, [attachedFile]);

	// ── Send ────────────────────────────────────────────────────────────────────

	const handleSend = useCallback(() => {
		const trimmed = text.trim();
		if (!trimmed && !attachedFile) return;

		if (attachedFile) {
			sendMessage({
				text: trimmed || undefined,
				type: attachedFile.type,
				filename: attachedFile.filename,
				fileSize: attachedFile.fileSize,
				mimeType: attachedFile.mimeType,
				fileUrl: attachedFile.previewUrl,
			});
			// Don't revoke previewUrl here — ChatArea still needs it to render
			setAttachedFile(null);
		} else {
			sendMessage({ text: trimmed, type: "text" });
		}

		setText("");
	}, [text, attachedFile, sendMessage]);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	const canSend = text.trim().length > 0 || attachedFile !== null;

	// ── Render ──────────────────────────────────────────────────────────────────

	return (
		<div className="px-6 py-4 bg-gray50 border-t border-gray200 shrink-0">
			{/* ── File preview chip ── */}
			{attachedFile && (
				<div className="flex items-center gap-3 mb-3 px-4 py-3 bg-white border border-gray200 rounded-[12px]">
					{/* Thumbnail for images, icon for everything else */}
					{isImage(attachedFile.mimeType) ? (
						<img
							src={attachedFile.previewUrl}
							alt={attachedFile.filename}
							className="w-12 h-12 rounded-lg object-cover shrink-0 border border-gray200"
						/>
					) : (
						<div className="w-12 h-12 rounded-lg bg-primaryLight flex items-center justify-center shrink-0 text-primary">
							<FileIcon mimeType={attachedFile.mimeType} size={22} />
						</div>
					)}

					{/* File meta */}
					<div className="flex-1 min-w-0">
						<p className="m-0 text-[13px] font-semibold text-dark truncate">
							{attachedFile.filename}
						</p>
						<p className="m-0 text-[11px] text-gray400 mt-0.5">
							{formatFileSize(attachedFile.fileSize)}
						</p>
					</div>

					{/* Remove */}
					<button
						type="button"
						onClick={handleRemoveFile}
						aria-label="Remove attachment"
						className="w-7 h-7 rounded-full bg-gray100 hover:bg-red/10 flex items-center justify-center text-gray400 hover:text-red transition-colors duration-150 shrink-0 border-none cursor-pointer"
					>
						<X size={14} />
					</button>
				</div>
			)}

			{/* ── Composer bar ── */}
			<div className="flex items-center gap-3 bg-white border border-gray200 rounded-[14px] pl-4 pr-3 py-2">
				<button
					type="button"
					aria-label="Voice message"
					className="text-gray400 hover:text-gray600 cursor-pointer bg-transparent border-none p-0 shrink-0"
				>
					<Mic size={18} />
				</button>

				<input
					type="text"
					placeholder={attachedFile ? "Add a caption…" : "Write Something…"}
					value={text}
					onChange={(e) => setText(e.target.value)}
					onKeyDown={handleKeyDown}
					aria-label="Message input"
					className="flex-1 border-none bg-transparent outline-none text-[14px] text-dark font-sans placeholder:text-gray400"
				/>

				<div className="flex items-center gap-2.5">
					{/* Paperclip — any file type */}
					<button
						type="button"
						aria-label="Attach file"
						onClick={() => fileInputRef.current?.click()}
						className="text-gray400 hover:text-primary cursor-pointer bg-transparent border-none p-0 transition-colors duration-150"
					>
						<Paperclip size={18} />
					</button>

					{/* Camera — images only */}
					<button
						type="button"
						aria-label="Attach image"
						onClick={() => imageInputRef.current?.click()}
						className="text-gray400 hover:text-primary cursor-pointer bg-transparent border-none p-0 transition-colors duration-150"
					>
						<Camera size={18} />
					</button>

					<button
						type="button"
						aria-label="Emoji"
						className="text-gray400 hover:text-gray600 cursor-pointer bg-transparent border-none p-0"
					>
						<Smile size={18} />
					</button>

					{/* Send */}
					<button
						type="button"
						onClick={handleSend}
						disabled={!canSend}
						aria-label="Send message"
						className="w-[38px] h-[38px] rounded-[10px] bg-primary border-none cursor-pointer flex items-center justify-center shrink-0 hover:bg-primaryHover transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
					>
						<Send size={16} className="text-white" />
					</button>
				</div>
			</div>

			{/* ── Hidden file inputs ── */}
			<input
				ref={fileInputRef}
				type="file"
				className="hidden"
				aria-hidden="true"
				onChange={handleFileSelect}
			/>
			<input
				ref={imageInputRef}
				type="file"
				accept="image/*"
				className="hidden"
				aria-hidden="true"
				onChange={handleFileSelect}
			/>
		</div>
	);
};

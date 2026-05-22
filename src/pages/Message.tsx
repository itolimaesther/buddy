import React from "react";
import { ContactList, ChatArea, MessageInput } from "../components/messages";
import {
	useMessagesStore,
	selectSelectedContact,
	selectFilteredContacts,
} from "../store";
import { useShallow } from "zustand/react/shallow";

export const MessagesPage: React.FC = () => {
	const selectedContact = useMessagesStore(useShallow(selectSelectedContact));
	const filteredContacts = useMessagesStore(useShallow(selectFilteredContacts));
	const messages = useMessagesStore((s) => s.messages);
	const selectedContactId = useMessagesStore((s) => s.selectedContactId);
	const searchQuery = useMessagesStore((s) => s.searchQuery);
	const setSelectedContactId = useMessagesStore((s) => s.setSelectedContactId);
	const setSearchQuery = useMessagesStore((s) => s.setSearchQuery);

	return (
		<div className="p-4 md:p-6 animate-slide-in-right overflow-hidden">
			<div className="flex flex-1 overflow-hidden h-[calc(100vh-73px)] rounded-2xl bg-white border border-gray-100">
				<div
					className={`w-full md:w-80 lg:w-96 flex-shrink-0 ${selectedContactId ? "hidden md:flex" : "flex"}`}
				>
					<ContactList
						contacts={filteredContacts}
						selectedId={selectedContactId}
						searchQuery={searchQuery}
						onSelect={setSelectedContactId}
						onSearchChange={setSearchQuery}
					/>
				</div>

				<div
					className={`flex-1 flex flex-col overflow-hidden ${!selectedContactId ? "hidden md:flex" : "flex"}`}
				>
					<ChatArea
						contact={selectedContact}
						messages={messages}
						onBack={() => setSelectedContactId(0)}
					/>
					<MessageInput />
				</div>
			</div>
		</div>
	);
};

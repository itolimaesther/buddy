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
		<div className="p-6 ">
			<div className="flex flex-1 gap-2 overflow-hidden h-[calc(100vh-73px)] rounded-2xl bg-white">
				<ContactList
					contacts={filteredContacts}
					selectedId={selectedContactId}
					searchQuery={searchQuery}
					onSelect={setSelectedContactId}
					onSearchChange={setSearchQuery}
				/>
				<div className="flex-1 flex flex-col overflow-hidden">
					<ChatArea contact={selectedContact} messages={messages} />
					<MessageInput />
				</div>
			</div>
		</div>
	);
};

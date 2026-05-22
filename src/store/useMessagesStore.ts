import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { CONTACTS, CHAT_MESSAGES } from "../constants";
import type { Contact, ChatMessage } from "../types";

//Types

interface MessagesState {
	contacts: Contact[];
	messages: ChatMessage[];
	selectedContactId: number;
	searchQuery: string;

	// Actions 
	setSelectedContactId: (id: number) => void;
	setSearchQuery: (query: string) => void;
	sendMessage: (text: string) => void;
}

// Store 

export const useMessagesStore = create<MessagesState>()(
	devtools(
		(set) => ({
			contacts: CONTACTS,
			messages: CHAT_MESSAGES,
			selectedContactId: CONTACTS[0].id,
			searchQuery: "",

			setSelectedContactId: (id) =>
				set({ selectedContactId: id }, false, "messages/selectContact"),

			setSearchQuery: (query) =>
				set({ searchQuery: query }, false, "messages/setSearchQuery"),

			sendMessage: (text) =>
				set(
					(state) => ({
						messages: [
							...state.messages,
							{
								id: state.messages.length + 1,
								from: "me" as const,
								text,
								time: new Date().toLocaleTimeString([], {
									hour: "2-digit",
									minute: "2-digit",
								}),
							},
						],
					}),
					false,
					"messages/sendMessage",
				),
		}),
		{ name: "MessagesStore" },
	),
);

// Selectors

export const selectSelectedContact = (state: MessagesState) =>
	state.contacts.find((c) => c.id === state.selectedContactId);

export const selectFilteredContacts = (state: MessagesState) =>
	state.contacts.filter((c) =>
		c.name.toLowerCase().includes(state.searchQuery.toLowerCase()),
	);

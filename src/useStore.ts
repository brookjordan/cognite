import { create } from "zustand";
import { makeUUID } from "./makeUUID";
import { MESSAGES } from "./FriendsArea";

interface NewMessage {
  text: string;
}

interface Message extends NewMessage {
  date: number;
  sender: Friend | null;
  id: string;
  isRead: boolean;
}

interface NewFriend {
  name: string;
}

export interface Friend extends NewFriend {
  id: string;
  messages: Message[];
  style: keyof typeof MESSAGES;
}

export const useStore = create<{
  friends: Friend[];
  currentFriend: Friend | null;
  addFriend: (friend: NewFriend) => Friend;
  setCurrentFriend: (friend: Friend) => void;
  addMessage: (text: string, from?: Friend | null) => Message;
}>((set) => ({
  friends: [] as Friend[],

  currentFriend: null,

  setCurrentFriend: (friend: Friend) =>
    set((state) => {
      friend.messages.forEach((m) => {
        m.isRead = true;
      });

      return {
        ...state,
        currentFriend: friend,
      };
    }),

  addFriend: (newFriend: NewFriend) => {
    const messageStyles = Object.keys(MESSAGES);

    const hydratedFriend: Friend = {
      ...newFriend,
      messages: [],
      id: makeUUID(),
      style: messageStyles[
        Math.floor(Math.random() * messageStyles.length)
      ] as keyof typeof MESSAGES,
    };

    set((state) => ({
      ...state,
      friends: [...state.friends, hydratedFriend],
    }));

    return hydratedFriend;
  },

  addMessage(text: string, from: Friend | null = null) {
    let hydratedMessage: Message | undefined;

    set((state) => {
      hydratedMessage = {
        text,
        date: Date.now(),
        sender: from,
        id: makeUUID(),
        isRead: !from || from === state.currentFriend,
      };

      return {
        ...state,
        friends: state.friends.map((f) => {
          if (f === (from ?? state.currentFriend)) {
            f.messages = [...f.messages, hydratedMessage as Message];
          }
          return f;
        }),
      };
    });

    return hydratedMessage as Message;
  },
}));

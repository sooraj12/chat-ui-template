import { v4 as uuidv4 } from "uuid";
import { ChatManager } from "../core/chatManager";

const chatsStore = (set) => ({
  chats: {
    activeChat: {
      msg: "",
      id: "",
      title: "",
      history: [],
    },
    chats: [],
    activeId: "",
    generating: false,
    chatManager: new ChatManager(),

    setMessage: (msg) => {
      set((state) => {
        state.chats.activeChat.msg = msg;
      });
    },

    sendMessage() {},

    setActiveChat() {},

    fetchChatHistory() {},

    getTitleFromQuery() {},
  },
});

export { chatsStore };

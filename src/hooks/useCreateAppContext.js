import { useCallback, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useChat } from "./useChat";

const chatManager = {};

function useCreatAppContext() {
  const { id: _id } = useParams();
  const [nextID, setNextID] = useState(uuidv4());
  const id = _id !== null && _id !== undefined ? _id : nextID;
  const llmName = "LLAMA3";

  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const currentChat = useChat(chatManager, id);

  const onNewMessage = useCallback(
    async (message) => {
      if (!message?.trim().length) {
        return false;
      }

      const parameters = {
        model: chatManager.options.getOption("parameters", "model", id),
        temperature: chatManager.options.getOption(
          "parameters",
          "temperature",
          id
        ),
      };

      if (id === nextID) {
        setNextID(uuidv4());
      }

      chatManager.sendMessage({
        chatID: id,
        content: message.trim(),
        requestedParameters: {
          ...parameters,
        },
        parentID: currentChat.leaf?.id,
      });
      // }

      return id;
    },
    [id, currentChat.leaf, nextID]
  );

  const regenerateMessage = useCallback(
    async (message) => {
      const parameters = {
        model: chatManager.options.getOption("parameters", "model", id),
        temperature: chatManager.options.getOption(
          "parameters",
          "temperature",
          id
        ),
      };

      await chatManager.regenerate(message, {
        ...parameters,
      });

      return true;
    },
    [id]
  );

  const editMessage = useCallback(
    async (message, content) => {
      if (!content?.trim().length) {
        return false;
      }

      const parameters = {
        model: chatManager.options.getOption("parameters", "model", id),
        temperature: chatManager.options.getOption(
          "parameters",
          "temperature",
          id
        ),
      };

      if (id && chatManager.has(id)) {
        await chatManager.sendMessage({
          chatID: id,
          content: content.trim(),
          requestedParameters: {
            ...parameters,
          },
          parentID: message.parentID,
        });
      } else {
        const id = await chatManager.createChat();
        await chatManager.sendMessage({
          chatID: id,
          content: content.trim(),
          requestedParameters: {
            ...parameters,
          },
          parentID: message.parentID,
        });
      }

      return true;
    },
    [id]
  );

  const generating =
    currentChat?.messagesToDisplay?.length > 0
      ? !currentChat.messagesToDisplay[currentChat.messagesToDisplay.length - 1]
          .done
      : false;

  const context = useMemo(
    () => ({
      id,
      chat: chatManager,
      currentChat,
      isHome,
      generating,
      onNewMessage,
      regenerateMessage,
      editMessage,
      llmName,
    }),
    [
      generating,
      onNewMessage,
      regenerateMessage,
      editMessage,
      currentChat,
      id,
      isHome,
      llmName,
    ]
  );

  return context;
}

export { useCreatAppContext };

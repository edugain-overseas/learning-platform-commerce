import { createContext, useContext, useEffect, useState } from "react";
import Chats from "../components/Chats/Chats";
import Drawer from "../components/shared/Drawer/Drawer";
import { webSocketUrl } from "../http/server";
import { useSelector } from "react-redux";
import { getAccessToken, getUserChats } from "../redux/user/selectors";

const ChatContext = createContext({});

export const useChats = () => {
  return useContext(ChatContext);
};

export const ChatProvider = ({ children }) => {
  const userChats = useSelector(getUserChats);
  const accessToken = useSelector(getAccessToken);

  const [isOpen, setIsOpen] = useState(false);
  const [chats, setChats] = useState([...userChats].reverse());
  const [selectedChatId, setSelectedChatId] = useState(
    userChats[userChats.length - 1]?.id
  );
  const [typeFilter, setTypeFilter] = useState("all");
  const [webSockets, setWebSockets] = useState([]);

  console.log(chats);

  const filtredChats =
    typeFilter === "all"
      ? chats
      : chats.filter(({ status }) => {
          return typeFilter === "active"
            ? status === typeFilter || status === "new" || status === "closing"
            : status === typeFilter;
        });

  const messages =
    chats.find(({ id }) => id === selectedChatId)?.messages || [];

  useEffect(() => {
    if (accessToken) {
      const existingChatIds = webSockets.map(({ id }) => id);

      const newWebSockets = userChats
        .filter(({ id }) => !existingChatIds.includes(id))
        .map(({ id }) => {
          const ws = new WebSocket(`${webSocketUrl}/${id}/${accessToken}`);
          ws.onopen = () => {
            console.log(`WebSocket connection established for chat ${id}`);
          };
          ws.onerror = (error) => {
            console.error(`WebSocket error for chat ${id}:`, error);
          };
          ws.onclose = () => {
            console.log(`WebSocket connection closed for chat ${id}`);
          };
          ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("on message", data);

            // recieve chat history
            if (data.type === "chat-history") {
              const incomigMessages = data.data.reverse();
              setChats((prev) =>
                prev.map((chat) =>
                  chat.id === id ? { ...chat, messages: incomigMessages } : chat
                )
              );
              return;
            }
            // recieve new message
            if (data.type === "new-message") {
              const newMessages = data.data;
              setChats((prev) =>
                prev.map((chat) =>
                  chat.id === id
                    ? {
                        ...chat,
                        messages: [...chat.messages, newMessages],
                      }
                    : chat
                )
              );
              return;
            }

            // revieve close chat offer from moder
            if (data.type === "close-chat") {
              setChats((prev) =>
                prev.map((chat) =>
                  chat.id === id ? { ...chat, status: "closing" } : chat
                )
              );
            }
          };
          return { id, websocket: ws };
        });

      setWebSockets((prev) => [...prev, ...newWebSockets]);
    }

    return () => {
      webSockets.forEach(({ websocket }) => {
        websocket.close();
      });
    };
    // eslint-disable-next-line
  }, [userChats, accessToken]);

  useEffect(() => {
    setChats((prev) => [
      ...userChats
        .filter(({ id }) => !prev.some(({ id: prevId }) => prevId === id))
        .reverse(),
      ...prev,
    ]);
  }, [userChats]);

  useEffect(() => {
    if (
      !filtredChats.find(({ id }) => id === selectedChatId) &&
      filtredChats.length !== 0
    ) {
      setSelectedChatId(filtredChats[0].id);
    }
  }, [filtredChats, selectedChatId]);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const createNewChat = () => {
    const newChatId = `new_chat_${chats.length + 1}`;
    if (typeFilter !== "all") setTypeFilter("all");
    setChats((prev) => [
      { id: newChatId, chat_subject: `New chat`, status: "proposed" },
      ...prev,
    ]);
    setSelectedChatId(newChatId);
  };

  const sendToWebsocket = (data, chatId) => {
    const ws = webSockets.find(({ id }) => id === chatId).websocket;
    if (ws) ws.send(data);
  };

  const deleteChat = (chatId) => {
    setChats((prev) => prev.filter(({ id }) => id !== chatId));
  };

  const closeChat = (chatId) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId ? { ...chat, status: "archive" } : chat
      )
    );
  };

  const resumeChat = (chatId) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId ? { ...chat, status: "active" } : chat
      )
    );
  };

  return (
    <ChatContext.Provider
      value={{
        handleOpen,
        handleClose,
        chats,
        filtredChats,
        selectedChatId,
        setSelectedChatId,
        createNewChat,
        typeFilter,
        setTypeFilter,
        messages,
        sendToWebsocket,
        deleteChat,
        closeChat,
        resumeChat,
      }}
    >
      {children}
      {isOpen && (
        <Drawer orientation="right" size="80vw" handleClose={handleClose}>
          <Chats />
        </Drawer>
      )}
    </ChatContext.Provider>
  );
};

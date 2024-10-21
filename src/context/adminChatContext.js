import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken, getUserChats } from "../redux/user/selectors";
import { webSocketUrl } from "../http/server";
import { moderJoinChat } from "../redux/user/slice";

export const chatFilterValues = ["all", "new", "active", "archive"];

const AdminChatContext = createContext(null);

export const useAdminChats = () => useContext(AdminChatContext);

export const AdminChatProvider = ({ children }) => {
  const chats = useSelector(getUserChats);
  const accessToken = useSelector(getAccessToken);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [chatsFilter, setChatsFilter] = useState("all");
  const [chatsData, setChatsData] = useState([]);
  const sockets = useRef([]);
  const dispatch = useDispatch();

  const filtredChats =
    chatsFilter === "all"
      ? chats
      : chats.filter(({ status }) => status === chatsFilter);

  const messages = chatsData.find(
    (chatData) => chatData.id === selectedChatId
  )?.messages;

  const selectedChat = chats.find(({ id }) => id === selectedChatId);

  const selectChat = (id) => {
    setSelectedChatId(+id);
  };

  const onFilterChage = (value) => setChatsFilter(value);

  const handleJoinChat = (id) => {
    try {
      const ws = new WebSocket(`${webSocketUrl}/${id}/${accessToken}`);

      ws.onopen = () => {
        console.log(`WebSocket connection established for chat ${id}`);

        sockets.current.push({ id, ws });

        dispatch(moderJoinChat(id));
      };
      ws.onerror = (error) => {
        console.error(`WebSocket error for chat ${id}:`, error);
      };
      ws.onclose = () => {
        console.log(`WebSocket connection closed for chat ${id}`);

        sockets.current = sockets.current.filter(
          ({ id: socketId }) => socketId !== id
        );
      };
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("on message", data);

        // recieve chat history
        if (data.type === "chat-history") {
          const incomigMessages = data.data.reverse();
          setChatsData((prev) => [
            ...prev,
            { id: id, messages: incomigMessages },
          ]);
          return;
        }

        // recieve new message
        if (data.type === "new-message") {
          const newMessages = data.data;
          setChatsData((prev) =>
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

        if (data.type === "close-chat") {
          setChatsData((prev) =>
            prev.map((chat) => {
              if (chat.id === id) {
                return { ...chat, status: "closing" };
              }
              return chat;
            })
          );
        }
      };
    } catch (error) {
      console.log(error);
    }
  };

  const sendNewMessageToWebsocket = (chatId, message, files = []) => {
    /*
    {
      type: 'new-message',
      message,
      files: [
        {
          file_type: '',
          file_name: '',
          file_size: int,
          file_path: ''
        },
      ]
    }
    */

    const data = {
      type: "new-message",
      message,
      files,
    };
    const websocket = sockets.current.find(
      ({ id }) => selectedChatId === id
    ).ws;

    try {
      websocket.send(JSON.stringify(data));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const closeChat = (chatId) => {
    const data = {
      type: "close-chat",
    };

    const websocket = sockets.current.find(({ id }) => chatId === id).ws;

    try {
      websocket.send(JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //admin chats connection
    chats.forEach(({ id, status }) => {
      if (status !== "new") {
        handleJoinChat(id);
      }
    });

    // eslint-disable-next-line
  }, [chats.length]);

  return (
    <AdminChatContext.Provider
      value={{
        allChats: chats,
        filtredChats,
        selectedChatId,
        messages,
        selectedChat,
        selectChat,
        onFilterChage,
        handleJoinChat,
        sendNewMessageToWebsocket,
        closeChat,
      }}
    >
      {children}
    </AdminChatContext.Provider>
  );
};

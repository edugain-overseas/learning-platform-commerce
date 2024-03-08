import { createContext, useContext, useEffect, useState } from "react";
import Chats from "../components/Chats/Chats";
import Drawer from "../components/shared/Drawer/Drawer";

const chatsInit = [
  {
    id: 1,
    title:
      "Chat 1 Chat 1 Chat 1 Chat 1Chat 1 Chat 1 Chat 1 Chat 1 Chat 1 Chat 1",
    status: "archive",
  },
  {
    id: 2,
    title: "Chat 2",
    status: "archive",
  },
  {
    id: 3,
    title: "Chat 3",
    status: "active",
  },
  {
    id: 4,
    title: "Chat 4",
    status: "active",
  },
  {
    id: 5,
    title: "Chat 5",
    status: "active",
  },
  {
    id: 6,
    title: "Chat 6",
    status: "active",
  },
  {
    id: 7,
    title: "Chat 7",
    status: "active",
  },
  {
    id: 8,
    title: "Chat 8",
    status: "active",
    initiator_id: 2,
    messages: [
      {
        id: 1,
        message: "I need to help",
        timestamp: "22.02.2024T12:02:02",
        chat_id: 1,
        sender_id: 2,
        sender_type: "student",
        recipient_id: null,
        recipient_type: "moderator",
        files: [
          {
            id: 1,
            file_type: "jpeg",
            file_name: "screen1.jpeg",
            file_path: "static/chatfiles/screen1.jpeg",
            file_size: 2442,
            message_id: 1,
          },
        ],
      },
    ],
  },
];

const ChatContext = createContext({});

export const useChats = () => {
  return useContext(ChatContext);
};

export const ChatProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chats, setChats] = useState([...chatsInit.reverse()]);
  const [selectedChatId, setSelectedChatId] = useState(0);
  const [typeFilter, setTypeFilter] = useState("all");

  const filtredChats =
    typeFilter === "all"
      ? chats
      : chats.filter(({ status }) => status === typeFilter);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const createNewChat = () => {
    const newChatId = chats.length + 1;
    if (typeFilter !== "all") setTypeFilter("all");
    setChats((prev) => [
      { id: newChatId, title: `New chat`, status: "new" },
      ...prev,
    ]);
    setSelectedChatId(newChatId);
  };

  useEffect(() => {
    if (!filtredChats.find(({ id }) => id === selectedChatId))
      setSelectedChatId(filtredChats[0].id);
  }, [filtredChats, selectedChatId]);

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

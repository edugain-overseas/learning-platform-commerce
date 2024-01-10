import { createContext, useContext, useState } from "react";
import Chats from "../components/Chats/Chats";
import Drawer from "../components/shared/Drawer/Drawer";

const ChatContext = createContext({});

export const useChats = () => {
  return useContext(ChatContext);
};

export const ChatProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <ChatContext.Provider value={{ handleOpen, handleClose }}>
      {children}
      {isOpen && (
        <Drawer orientation="right" size="80vw" handleClose={handleClose}>
          <Chats />
        </Drawer>
      )}
    </ChatContext.Provider>
  );
};

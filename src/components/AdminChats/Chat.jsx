import React from "react";
import { useAdminChats } from "../../context/adminChatContext";
import ChatFeed from "./ChatFeed";
import ChatInput from "./ChatInput";
import JoinChatBtn from "./JoinChatBtn";
import styles from "./AdminChatsComponent.module.scss";

const renderChatByStatus = (status) => {
  switch (status) {
    case "new":
      return (
        <div className={styles.joinChatWrapper}>
          <JoinChatBtn />
        </div>
      );
    case "active":
      return (
        <>
          <ChatFeed />
          <ChatInput />
        </>
      );
    case "archive":
      return (
        <>
          <ChatFeed />
          <p className={styles.closedChatMessage}>This chat is closed</p>
        </>
      );
    default:
      return null;
  }
};

const Chat = () => {
  const { selectedChat } = useAdminChats();

  if (!selectedChat) return null;

  const chatStatus = selectedChat.status;

  return (
    <div className={styles.chatWrapper}>{renderChatByStatus(chatStatus)}</div>
  );
};

export default Chat;

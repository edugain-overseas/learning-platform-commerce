import React from "react";
import { useAdminChats } from "./adminChatContext";
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
      return null;
    default:
      return null;
  }
};

const Chat = () => {
  const { selectedChat } = useAdminChats();

  console.log(selectedChat);

  if (!selectedChat) return null;

  const chatStatus = selectedChat.status;

  return (
    <div className={styles.chatWrapper}>{renderChatByStatus(chatStatus)}</div>
  );
};

export default Chat;

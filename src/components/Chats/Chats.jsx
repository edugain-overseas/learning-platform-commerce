import React from "react";
import { ReactComponent as PlusIcon } from "../../images/icons/plus.svg";
import styles from "./Chats.module.scss";
import ChatsNavBar from "./ChatsNavBar/ChatsNavBar";
import { useChats } from "../../context/chatContext";
import ChatsFilters from "./ChatsFilters/ChatsFilters";
import ChatInput from "./ChatInput/ChatInput";
import ChatsFeed from "./ChatsFeed/ChatsFeed";

const Chats = () => {
  const { createNewChat } = useChats();
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.header}>
        <button
          className={styles.addNewChat}
          title="Create new chat"
          onClick={createNewChat}
        >
          <PlusIcon />
        </button>
        <ChatsNavBar />
      </div>
      <div className={styles.body}>
        <div className={styles.chatAsideBar}>
          <ChatsFilters />
        </div>
        <div className={styles.chatMessagesWrapper}>
          <ChatsFeed />
          <ChatInput />
        </div>
      </div>
    </div>
  );
};

export default Chats;

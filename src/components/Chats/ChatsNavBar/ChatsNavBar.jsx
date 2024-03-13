import React from "react";
import styles from "../Chats.module.scss";
import HorizontalScroller from "../../shared/HorizontalScroller/HorizontalScroller";
import { useChats } from "../../../context/chatContext";

const ChatsNavBar = () => {
  const { filtredChats, selectedChatId, setSelectedChatId } = useChats();

  return (
    <div className={styles.navWrapper}>
      <HorizontalScroller>
        <ul className={styles.navItems}>
          {filtredChats.map(({ id, chat_subject: title }) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => setSelectedChatId(id)}
                className={`${styles.selectChatBtn} ${
                  selectedChatId === id ? styles.selected : ""
                }`}
              >
                <span title={title}>{title}</span>
              </button>
            </li>
          ))}
        </ul>
      </HorizontalScroller>
    </div>
  );
};

export default ChatsNavBar;

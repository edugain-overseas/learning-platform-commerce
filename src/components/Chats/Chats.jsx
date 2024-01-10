import React from "react";
import styles from "./Chats.module.scss";
import ChatsNavBar from "./ChatsNavBar/ChatsNavBar";

const Chats = () => {
  return (
    <div className={styles.mainWrapper}>
      <ChatsNavBar />
    </div>
  );
};

export default Chats;
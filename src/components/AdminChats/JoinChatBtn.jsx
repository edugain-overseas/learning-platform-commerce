import React from "react";
import { LoginOutlined } from "@ant-design/icons";
import styles from "./AdminChatsComponent.module.scss";
import { useAdminChats } from "./adminChatContext";

const JoinChatBtn = () => {
  const { handleJoinChat } = useAdminChats();
  return (
    <button className={styles.joinChatBtn} onClick={handleJoinChat}>
      <span className={styles.joinBtnLabel}>Join chat</span>
      <LoginOutlined />
    </button>
  );
};

export default JoinChatBtn;

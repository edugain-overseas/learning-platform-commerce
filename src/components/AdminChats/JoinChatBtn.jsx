import React from "react";
import { LoginOutlined } from "@ant-design/icons";
import styles from "./AdminChatsComponent.module.scss";
import { useAdminChats } from "../../context/adminChatContext";

const JoinChatBtn = () => {
  const { handleJoinChat, selectedChatId } = useAdminChats();
  return (
    <button
      className={styles.joinChatBtn}
      onClick={() => handleJoinChat(selectedChatId)}
    >
      <span className={styles.joinBtnLabel}>Join chat</span>
      <LoginOutlined />
    </button>
  );
};

export default JoinChatBtn;

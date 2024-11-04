import React from "react";
import { useChats } from "../../../context/chatContext";
import styles from "./CloseChatPanel.module.scss";

const CloseChatPanel = ({ chat }) => {
  const { sendToWebsocket, closeChat, resumeChat } = useChats();

  const handleApproveClosing = () => {
    const data = JSON.stringify({ type: "approve" });
    try {
      sendToWebsocket(data, chat.id);
      closeChat(chat.id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRejectClosing = () => {
    const data = JSON.stringify({ type: "reject" });
    try {
      sendToWebsocket(data, chat.id);
      resumeChat(chat.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.closeChatContainer}>
      <p>Do you want to close this chat?</p>
      <div className={styles.btnsContainer}>
        <button onClick={handleApproveClosing}>Yes</button>
        <button onClick={handleRejectClosing}>No</button>
      </div>
    </div>
  );
};

export default CloseChatPanel;

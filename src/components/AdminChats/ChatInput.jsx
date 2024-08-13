import React, { useState } from "react";
import { ReactComponent as SendIcon } from "../../images/icons/send.svg";
import Textarea from "../shared/Textarea/Textarea";
import styles from "./AdminChatsComponent.module.scss";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  return (
    <div className={styles.inputWrapper}>
      <Textarea minRows={1} maxRows={8} value={message} onChange={setMessage} />
      <button
        type="submit"
        className={styles.sendButton}
        disabled={message.trim() === ""}
      >
        <SendIcon />
      </button>
    </div>
  );
};

export default ChatInput;

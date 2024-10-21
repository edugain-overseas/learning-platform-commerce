import React, { useState } from "react";
import { ReactComponent as SendIcon } from "../../images/icons/send.svg";
import { useAdminChats } from "../../context/adminChatContext";
import Textarea from "../shared/Textarea/Textarea";
import ChatAttachFile from "../Chats/ChatInput/ChatAttachFile";
import styles from "./AdminChatsComponent.module.scss";

const ChatInput = () => {
  const { sendNewMessageToWebsocket, selectedChatId } = useAdminChats();
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);
  const [isFormFocused, setIsFormFocused] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const isMessageWasSended = sendNewMessageToWebsocket(
      selectedChatId,
      message,
      files
    );
    if (isMessageWasSended) {
      setMessage("");
      setFiles([]);
    }
  };

  const handleTextAreaBrur = (e) => {
    if (e.relatedTarget?.className?.includes("ChatInput")) {
      return;
    }
    setIsFormFocused(false);
  };

  const addFile = (file) => {
    setFiles((prev) => [...prev, file]);
  };

  const removeFile = (filePath) => {
    setFiles((prev) => prev.filter(({ file_path }) => file_path !== filePath));
  };

  return (
    <form className={styles.chatForm} onSubmit={handleSendMessage}>
      <Textarea
        className={styles.chatTextarea}
        value={message}
        minRows={isFormFocused ? 4 : 1}
        maxRows={10}
        placeholder="Enter you message here"
        onChange={setMessage}
        fontSize={16}
        setMinRowsOnBlur={true}
        onFocus={() => setIsFormFocused(true)}
        onBlur={handleTextAreaBrur}
      />
      <button
        type="submit"
        className={styles.sendButton}
        disabled={message.trim() === "" && files.length === 0}
      >
        <SendIcon />
      </button>
      <ChatAttachFile files={files} addFile={addFile} removeFile={removeFile} />
    </form>
  );
};

export default ChatInput;

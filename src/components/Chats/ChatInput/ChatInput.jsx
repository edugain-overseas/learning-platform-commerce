import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { initializationChatThunk } from "../../../redux/user/operations";
import { useChats } from "../../../context/chatContext";
import { ReactComponent as SendIcon } from "../../../images/icons/send.svg";
import Textarea from "../../shared/Textarea/Textarea";
import InputText from "../../auth/shared/InputText/InputText";
import ChatAttachFile from "./ChatAttachFile";
import styles from "./ChatInput.module.scss";

const ChatInput = () => {
  const {
    sendToWebsocket,
    chats,
    selectedChatId,
    setSelectedChatId,
    deleteChat,
  } = useChats();
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);
  const [subject, setSubject] = useState("");
  const [isFormFocused, setIsFormFocused] = useState(false);
  const dispatch = useDispatch();

  const chat = chats.find(({ id }) => id === selectedChatId);

  const isChatProposed =
    chats.find(({ id }) => selectedChatId === id)?.status === "proposed";

  const handleSendMessage = (e) => {
    e.preventDefault();

    const chatId = chats.find(({ id }) => selectedChatId === id).id;
    if (isChatProposed) {
      const chatData = { chat_subject: subject, message: message };
      dispatch(initializationChatThunk(chatData)).then(({ response }) => {
        setSelectedChatId(response?.id);
        setMessage("");
        setSubject("");
        deleteChat(chatId);
      });
    } else {
      console.log({
        type: "new-message",
        message,
        files,
      });
      const data = JSON.stringify({
        type: "new-message",
        message,
        files,
      });
      sendToWebsocket(data, chatId);
      setMessage("");
      setIsFormFocused(false);
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

  if (chat?.status === "archive") {
    return <p className={styles.closeChatMessage}>This chat is closed</p>;
  }

  return (
    <form className={styles.chatForm} onSubmit={handleSendMessage}>
      <div className={styles.inputsWrapper}>
        {isChatProposed && (
          <div className={styles.subjectInutWrapper}>
            <InputText
              name={"Chat subject"}
              value={subject}
              onChange={setSubject}
              width={"100%"}
              height="38rem"
            />
          </div>
        )}
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
      </div>
      <button
        type="submit"
        className={styles.sendButton}
        disabled={
          (message.trim() === "" && files.length === 0) ||
          (isChatProposed && subject === "")
        }
      >
        <SendIcon />
      </button>
      <ChatAttachFile files={files} addFile={addFile} removeFile={removeFile} />
    </form>
  );
};

export default ChatInput;

import React, { useState } from "react";
import { useChats } from "../../../context/chatContext";
import { ReactComponent as SendIcon } from "../../../images/icons/send.svg";
import Textarea from "../../shared/Textarea/Textarea";
import InputText from "../../auth/shared/InputText/InputText";
import styles from "./ChatInput.module.scss";
import { useDispatch } from "react-redux";
import { initializationChatThunk } from "../../../redux/user/operations";

const ChatInput = () => {
  const {
    sendToWebsocket,
    chats,
    selectedChatId,
    setSelectedChatId,
    deleteChat,
  } = useChats();
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [isFormFocused, setIsFormFocused] = useState(false);
  const dispatch = useDispatch();

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
      const data = JSON.stringify({ type: "new-message", message, files: [] });
      console.log(data);
      sendToWebsocket(data, chatId);
      setMessage("");
      setIsFormFocused(false);
    }
  };

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
          minRows={isFormFocused ? 2 : 1}
          maxRows={10}
          placeholder="Enter you message here"
          onChange={setMessage}
          fontSize={16}
          setMinRowsonBlur={true}
          onFocus={() => setIsFormFocused(true)}
          onBlur={() => setIsFormFocused(false)}
        />
      </div>
      <button
        type="submit"
        className={styles.sendButton}
        disabled={message === "" || (isChatProposed && subject === "")}
      >
        <SendIcon />
      </button>
    </form>
  );
};

export default ChatInput;

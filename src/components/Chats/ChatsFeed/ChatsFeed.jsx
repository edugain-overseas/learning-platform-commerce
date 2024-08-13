import React, { useEffect, useRef } from "react";
import { useChats } from "../../../context/chatContext";
import styles from "./ChatsFeed.module.scss";
import ChatMessage from "../ChatMessage/ChatMessage";
import { getFormattedStrFromDate } from "../../../utils/formatDate";
import { useSelector } from "react-redux";
import { getUserId } from "../../../redux/user/selectors";

const ChatsFeed = () => {
  const {
    messages,
    chats,
    selectedChatId,
    sendToWebsocket,
    closeChat,
    resumeChat,
  } = useChats();
  const userId = useSelector(getUserId);
  const chatScrollerRef = useRef(null);

  const chat = chats.find(({ id }) => id === selectedChatId);

  useEffect(() => {
    if (chatScrollerRef.current) {
      chatScrollerRef.current.scrollTop = chatScrollerRef.current.scrollHeight;
    }
  }, [messages.length]);

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
    <div className={styles.chatFeedWrapper} ref={chatScrollerRef}>
      <div className={styles.chatScroller}>
        {messages.map(
          (
            { message, id, files, timestamp, fullname, user_image, sender_id },
            index,
            array
          ) => (
            <ChatMessage
              key={id}
              message={message}
              senderName={fullname}
              files={files}
              time={getFormattedStrFromDate(timestamp, "HH:mm")}
              avatar={user_image}
              orientation={sender_id === userId ? "out" : "in"}
              animationDelayIndex={array.length - index}
            />
          )
        )}
      </div>
      {chat?.status === "closing" && (
        <div>
          <p>Do you want to close this chat?</p>
          <div>
            <button onClick={handleApproveClosing}>Yes</button>
            <button onClick={handleRejectClosing}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatsFeed;

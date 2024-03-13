import React, { useEffect, useRef } from "react";
import { useChats } from "../../../context/chatContext";
import styles from "./ChatsFeed.module.scss";
import ChatMessage from "../ChatMessage/ChatMessage";
import { getFormattedStrFromDate } from "../../../utils/formatDate";
import { useSelector } from "react-redux";
import { getUserId } from "../../../redux/user/selectors";

const ChatsFeed = () => {
  const { messages } = useChats();
  const userId = useSelector(getUserId);
  const chatScrollerRef = useRef(null);

  useEffect(() => {
    if (chatScrollerRef.current) {
      chatScrollerRef.current.scrollTop = chatScrollerRef.current.scrollHeight;
    }
  }, [messages.length]);

  console.log(messages);
  return (
    <div className={styles.chatFeedWrapper} ref={chatScrollerRef}>
      <div className={styles.chatScroller}>
        {messages.map(
          (
            { message, id, files, timestamp, username, user_image, sender_id },
            index,
            array
          ) => (
            <ChatMessage
              key={id}
              message={message}
              senderName={username}
              files={files}
              time={getFormattedStrFromDate(timestamp, "HH:mm")}
              avatar={user_image}
              orientation={sender_id === userId ? "out" : "in"}
              animationDelayIndex={array.length - index}
            />
          )
        )}
      </div>
    </div>
  );
};

export default ChatsFeed;

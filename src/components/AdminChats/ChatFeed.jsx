import React, { useEffect, useRef } from "react";
import styles from "./AdminChatsComponent.module.scss";
import { useAdminChats } from "./adminChatContext";
import ChatMessage from "../Chats/ChatMessage/ChatMessage";
import { getFormattedStrFromDate } from "../../utils/formatDate";
import { useSelector } from "react-redux";
import { getUserId } from "../../redux/user/selectors";

const ChatFeed = () => {
  const userId = useSelector(getUserId);
  const wrapperRef = useRef(null);

  const { messages } = useAdminChats();

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollTop = wrapperRef.current.scrollHeight;
    }
  }, [messages?.length]);

  if (!messages) return null;

  return (
    <div className={styles.chatFeedWrapper} ref={wrapperRef}>
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
    </div>
  );
};

export default ChatFeed;

import React, { useEffect, useRef } from "react";
import { useChats } from "../../../context/chatContext";
import styles from "./ChatsFeed.module.scss";
import ChatMessage from "../ChatMessage/ChatMessage";
import { getFormattedStrFromDate } from "../../../utils/formatDate";
import { useSelector } from "react-redux";
import { getUserId } from "../../../redux/user/selectors";
import CloseChatPanel from "../CloseChatPanel/CloseChatPanel";

const ChatsFeed = () => {
  const { messages, chats, selectedChatId } = useChats();
  const userId = useSelector(getUserId);
  const chatScrollerRef = useRef(null);

  const chat = chats.find(({ id }) => id === selectedChatId);

  console.log(chat);

  useEffect(() => {
    if (chatScrollerRef.current) {
      chatScrollerRef.current.scrollTop = chatScrollerRef.current.scrollHeight;
    }
  }, [messages.length, chat?.status]);

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
      {chat?.status === "closing" && <CloseChatPanel chat={chat} />}
    </div>
  );
};

export default ChatsFeed;

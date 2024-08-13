import React from "react";
import { useAdminChats } from "./adminChatContext";
import {
  CommentOutlined,
  FolderOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import AntMenu from "../AntComponents/AntMenu";
import styles from "./AdminChatsComponent.module.scss";

export const ChatIcon = ({ type }) => {
  switch (type) {
    case "new":
      return <MessageOutlined />;
    case "active":
      return <CommentOutlined />;
    case "archive":
      return <FolderOutlined />;
    default:
      return null;
  }
};

const designTokens = {
  iconMarginInlineEnd: "6rem",
  itemColor: "#7e8ca8",
  itemHoverBg: "rgba(131, 131, 131, 0.2)",
  itemHoverColor: "#001c54",
  itemSelectedBg: "#001c54",
  itemSelectedColor: "#fff",
};

const ChatsList = ({ children }) => {
  const { filtredChats, selectChat } = useAdminChats();

  const menuItems = filtredChats.map((chat) => ({
    key: `${chat.id}`,
    icon: <ChatIcon type={chat.status} />,
    label: chat.chat_subject,
  }));

  return (
    <div className={styles.chatsListWrapper}>
      {children}
      <AntMenu
        designTokens={designTokens}
        items={menuItems}
        className={styles.chatsMenu}
        onSelect={({ key }) => selectChat(key)}
      />
    </div>
  );
};

export default ChatsList;

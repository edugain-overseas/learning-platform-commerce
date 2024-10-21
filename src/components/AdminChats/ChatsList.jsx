import React from "react";
import { useAdminChats } from "../../context/adminChatContext";
import {
  CommentOutlined,
  FolderOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { ReactComponent as DetailsIcon } from "../../images/icons/details.svg";
import AntMenu from "../AntComponents/AntMenu";
import ChatDetailsDropdown from "./ChatDetailsDropdown";
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

  const handleSelect = (data) => {
    selectChat(data.key);
  };

  const menuItems = filtredChats.map((chat) => ({
    key: `${chat.id}`,
    icon: <ChatIcon type={chat.status} />,
    label: (
      <>
        <span className={styles.chatTitle}>{chat.chat_subject}</span>
        <ChatDetailsDropdown chatId={chat.id} />
      </>
    ),
  }));

  return (
    <div className={styles.chatsListWrapper}>
      {children}
      <AntMenu
        designTokens={designTokens}
        mode="inline"
        expandIcon={<DetailsIcon />}
        triggerSubMenuAction="click"
        items={menuItems}
        className={styles.chatsMenu}
        onSelect={handleSelect}
        style={{ width: "100%", maxWidth: "400rem" }}
      />
    </div>
  );
};

export default ChatsList;

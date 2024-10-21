import React, { useState } from "react";
import { Dropdown } from "antd";
import { ReactComponent as DetailsIcon } from "../../images/icons/details.svg";
import { ReactComponent as CloseIcon } from "../../images/icons/cross.svg";
import styles from "./AdminChatsComponent.module.scss";
import { useAdminChats } from "../../context/adminChatContext";

const CloseChatBtn = () => {
  return (
    <div className={styles.closeChatBtn}>
      <CloseIcon />
      <span>close chat</span>
    </div>
  );
};

const ChatDetailsDropdown = ({ chatId }) => {
  const { closeChat } = useAdminChats();
  const [dropwdownOpen, setDropwdownOpen] = useState();

  const handleOpenDropdownBtnClick = (e) => {
    e.stopPropagation();
  };

  const handleMenuClick = (e) => {
    e.domEvent.stopPropagation();
    if (e.key === "close") {
      closeChat(chatId)
    }
    setDropwdownOpen(false);
  };

  const dropdownItems = [
    {
      key: `close`,
      label: <CloseChatBtn />,
      danger: true,
    },
  ];

  return (
    <Dropdown
      menu={{ items: dropdownItems, onClick: handleMenuClick }}
      trigger="click"
      placement="right"
      open={dropwdownOpen}
      onOpenChange={(open) => setDropwdownOpen(open)}
      className={styles.detailsDropdown}
    >
      <button
        className={styles.chatMenuDetailsBtn}
        onClick={handleOpenDropdownBtnClick}
      >
        <DetailsIcon />
      </button>
    </Dropdown>
  );
};

export default ChatDetailsDropdown;

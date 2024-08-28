import React from "react";
import { chatFilterValues, useAdminChats } from "./adminChatContext";
import { ChatIcon } from "./ChatsList";
import AntSegment from "../AntComponents/AntSegment";
import styles from "./AdminChatsComponent.module.scss";

const designTokens = {
  itemActiveBg: "rgba(208, 0, 0, 1)",
  itemColor: "#7e8ca8",
  itemHoverBg: "transparent",
  itemHoverColor: "#001c54",
  itemSelectedBg: "rgba(208, 0, 0, 9)",
  itemSelectedColor: "#fff",
};

const filterItems = chatFilterValues.map((filter) => ({
  label: filter,
  value: filter,
  icon: <ChatIcon type={filter} />,
}));

const ChatsSegment = () => {
  const { onFilterChage } = useAdminChats();

  return (
    <div className={styles.chatsSegmentWrapper}>
      <AntSegment
        designTokens={designTokens}
        options={filterItems}
        className={styles.chatsSegment}
        defaultValue={chatFilterValues[0]}
        onChange={onFilterChage}
      />
    </div>
  );
};

export default ChatsSegment;

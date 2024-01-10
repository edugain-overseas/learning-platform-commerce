import React from "react";
import styles from "./ChatsFloatBtn.module.scss";
import { MessageOutlined } from "@ant-design/icons";
import Badge from "../shared/Badge/Badge";
import { useChats } from "../../context/chatContext";

const ChatsFloatBtn = () => {
  const { handleOpen } = useChats();
  return (
    <div className={styles.outerWrapper} onClick={handleOpen}>
      <Badge type="filled" pulsing={true}>
        <div className={styles.innerWrapper}>
          <button type="button" className={styles.btn}>
            <MessageOutlined className={styles.chatsIcon} />
          </button>
        </div>
      </Badge>
    </div>
  );
};

export default ChatsFloatBtn;

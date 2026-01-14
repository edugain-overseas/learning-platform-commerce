import React from "react";
import { useNotificationMessage } from "../../../../hooks/useNotificationMessage";
import { ReactComponent as BellIcon } from "../../../../images/icons/bell.svg";
import { ReactComponent as BadgeBellIcon } from "../../../../images/icons/bell-for-badge.svg";
import styles from "./NotificationButton.module.scss";

const messages = [];

// const messages = [{}, {}];

const NotificationButton = () => {
  const [messageApi, contextHolder] = useNotificationMessage();

  const amoutTodisplay = (messages) => {
    if (messages.length > 99) {
      return "99+";
    }
    return messages.length;
  };

  return (
    <>
      {contextHolder}
      <button
        className={styles.wrapperBtn}
        onClick={() =>
          messageApi.open({
            type: "info",
            content: "You don't have notifications yet",
            duration: 3,
          })
        }
      >
        {messages.length !== 0 ? <BadgeBellIcon /> : <BellIcon />}
        {messages.length !== 0 && (
          <span className={styles.badge}>{amoutTodisplay(messages)}</span>
        )}
      </button>
    </>
  );
};

export default NotificationButton;

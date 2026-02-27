import React from "react";
import { ReactComponent as BellIcon } from "../../../../images/icons/bell.svg";
import { ReactComponent as BadgeBellIcon } from "../../../../images/icons/bell-for-badge.svg";
import { useNotifications } from "../../../../context/NotificationsContext";
import styles from "./NotificationButton.module.scss";

const messages = [];

// const messages = [{}, {}];

const NotificationButton = () => {
  const { open } = useNotifications();

  const amoutTodisplay = (messages) => {
    if (messages.length > 99) {
      return "99+";
    }
    return messages.length;
  };

  return (
    <>
      <button className={styles.wrapperBtn} onClick={open}>
        {messages.length !== 0 ? <BadgeBellIcon /> : <BellIcon />}
        {messages.length !== 0 && (
          <span className={styles.badge}>{amoutTodisplay(messages)}</span>
        )}
      </button>
    </>
  );
};

export default NotificationButton;

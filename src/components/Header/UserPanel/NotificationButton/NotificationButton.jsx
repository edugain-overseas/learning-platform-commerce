import React from "react";
import { useNotificationMessage } from "../../../../hooks/useNotificationMessage";
import { ReactComponent as BellIcon } from "../../../../images/icons/bellWithBadge.svg";
import styles from "./NotificationButton.module.scss";

const NotificationButton = () => {
  // const [messageApi, contextHolder] = useNotificationMessage();
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
        <BellIcon />
        <span className={styles.badge}>{amoutTodisplay([])}</span>
      </button>
    </>
  );
};

export default NotificationButton;

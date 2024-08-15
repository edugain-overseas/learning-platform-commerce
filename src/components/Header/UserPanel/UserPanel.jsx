import React from "react";
import { useSelector } from "react-redux";
import { getUserInfo } from "../../../redux/user/selectors";
import NotificationButton from "./NotificationButton/NotificationButton";
import Avatar from "../../shared/Avatar/Avatar";
import styles from "./UserPanel.module.scss";

const UserPanel = () => {
  const userInfo = useSelector(getUserInfo);

  return (
    <div className={styles.wrapper}>
      <NotificationButton />
      <div className={styles.userWrapper}>
        <div className={styles.userAvatarWrapper}>
          <Avatar
            src={userInfo.avatarURL}
            editable={false}
            alt={userInfo.username}
            size="36rem"
          />
        </div>
        <span className={styles.userName}>{userInfo.username}</span>
      </div>
    </div>
  );
};

export default UserPanel;

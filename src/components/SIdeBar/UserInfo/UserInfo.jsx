import React from "react";
import { useSelector } from "react-redux";
import { getAccessToken, getUserInfo } from "../../../redux/user/selectors";
import Avatar from "../../shared/Avatar/Avatar";
import styles from "./UserInfo.module.scss";

const UserInfo = () => {
  const accessToken = useSelector(getAccessToken);

  const userInfo = useSelector(getUserInfo);

  const username = userInfo.username;

  const isModer = userInfo.userType === "moder";

  return (
    <div className={styles.wrapper} id="expanded">
      <Avatar
        src={userInfo.avatarURL}
      />
      <span className={styles.fullName}>
        {username === "" ? "User Name" : username}
      </span>
      {accessToken && !isModer && (
        <div className={styles.studyInfo}>
          <span>{userInfo.courses.length} course</span>
          <span>0 certificate</span>
        </div>
      )}
    </div>
  );
};

export default UserInfo;

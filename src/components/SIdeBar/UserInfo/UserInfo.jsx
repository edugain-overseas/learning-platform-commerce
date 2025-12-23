import React from "react";
import { useSelector } from "react-redux";
import { getAccessToken, getUserInfo } from "../../../redux/user/selectors";
import { Link } from "react-router-dom";
import Avatar from "../../shared/Avatar/Avatar";
import styles from "./UserInfo.module.scss";

const UserInfo = () => {
  const accessToken = useSelector(getAccessToken);

  const userInfo = useSelector(getUserInfo);

  const username = userInfo.username === "" ? "User Name" : userInfo.username;

  const isModer = userInfo.userType === "moder";

  const isAuthorizedStudent = !!accessToken && !isModer;

  return (
    <div className={styles.wrapper} id="expanded">
      <Avatar src={userInfo.avatarURL} />
      {isAuthorizedStudent ? (
        <Link to="/me">
          <span className={styles.fullName}>{username}</span>
        </Link>
      ) : (
        <span className={styles.fullName}>{username}</span>
      )}
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

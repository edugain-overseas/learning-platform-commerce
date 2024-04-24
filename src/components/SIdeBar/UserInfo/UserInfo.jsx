import React from "react";
import { useSelector } from "react-redux";
import { getAccessToken, getUserInfo } from "../../../redux/user/selectors";
import Avatar from "../../shared/Avatar/Avatar";
import styles from "./UserInfo.module.scss";
import { serverName } from "../../../http/sever";
// import AvatarFallback from "../../shared/AvatarFallback/AvatarFallback";

const UserInfo = () => {
  const accessToken = useSelector(getAccessToken);

  const userInfo = useSelector(getUserInfo);

  const username = userInfo.username;

  const handleUploadAvatar = (file) => {
    console.log(file);
  };

  return (
    <div className={styles.wrapper} id="expanded">
      <Avatar
        handleUpload={handleUploadAvatar}
        editable={false}
        src={
          userInfo.avatarURL !== ""
            ? `${serverName}/${userInfo.avatarURL}`
            : null
        }
      />
      <span className={styles.fullName}>
        {username === "" ? "User Name" : username}
      </span>
      {accessToken && (
        <div className={styles.studyInfo}>
          <span>{userInfo.courses.length} course</span>
          <span>0 certificate</span>
        </div>
      )}
    </div>
  );
};

export default UserInfo;

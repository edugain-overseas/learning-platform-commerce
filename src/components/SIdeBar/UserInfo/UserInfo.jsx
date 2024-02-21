import React from "react";
import { useSelector } from "react-redux";
import { getAccessToken, getUserInfo } from "../../../redux/user/selectors";
import Avatar from "../../shared/Avatar/Avatar";
import styles from "./UserInfo.module.scss";
// import AvatarFallback from "../../shared/AvatarFallback/AvatarFallback";

const UserInfo = () => {
  const accessToken = useSelector(getAccessToken);

  const userInfo = useSelector(getUserInfo);

  const userFullName = userInfo.name + " " + userInfo.surname;

  const handleUploadAvatar = (file) => {
    console.log(file);
  };

  return (
    <div className={styles.wrapper} id="expanded">
      <Avatar handleUpload={handleUploadAvatar} editable={false} />
      <span className={styles.fullName}>
        {userFullName === " " ? "User Name" : userFullName}
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

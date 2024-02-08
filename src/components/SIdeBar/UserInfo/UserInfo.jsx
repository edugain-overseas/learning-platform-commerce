import React from "react";
import { useSelector } from "react-redux";
import { getAccessToken } from "../../../redux/user/selectors";
import Avatar from "../../shared/Avatar/Avatar";
import styles from "./UserInfo.module.scss";
// import AvatarFallback from "../../shared/AvatarFallback/AvatarFallback";

const UserInfo = () => {
  const accessToken = useSelector(getAccessToken);

  const handleUploadAvatar = (file) => {
    console.log(file);
  };

  return (
    <div className={styles.wrapper} id="expanded">
      <Avatar handleUpload={handleUploadAvatar} />
      <span className={styles.fullName}>
        {accessToken ? "Sam James" : "User Name"}
      </span>
      {accessToken && (
        <div className={styles.studyInfo}>
          <span>4 course</span>
          <span>1 certificate</span>
        </div>
      )}
    </div>
  );
};

export default UserInfo;

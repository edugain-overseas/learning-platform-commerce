import React from "react";
import styles from "./UserInfo.module.scss";
import Avatar from "../../shared/Avatar/Avatar";

const UserInfo = () => {
  const handleUploadAvatar = (file) => {
    console.log(file);
  };

  return (
    <div className={styles.wrapper} id="expanded">
      <Avatar handleUpload={handleUploadAvatar} />
      <span className={styles.fullName}>Sam James</span>
      <div className={styles.studyInfo}>
        <span>4 course</span>
        <span>1 certificate</span>
      </div>
    </div>
  );
};

export default UserInfo;

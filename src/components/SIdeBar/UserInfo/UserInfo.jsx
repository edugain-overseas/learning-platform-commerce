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

  const certificates = userInfo.certificates;

  const userCoursesCertificates = certificates.reduce((array, catCert) => {
    const coursesCert = catCert.course_certificate_data?.filter(
      (courseCert) => courseCert?.course_certificate_id,
    );
    console.log(array, catCert, coursesCert);

    return [...array, ...coursesCert];
  }, []);

  console.log(certificates);
  console.log(userCoursesCertificates);

  return (
    <div className={styles.wrapper} id="expanded">
      <Link to={isAuthorizedStudent ? "/me" : null}>
        <Avatar src={userInfo.avatarURL} />
        <span className={styles.fullName}>{username}</span>
      </Link>
      {accessToken && !isModer && (
        <div className={styles.studyInfo}>
          <span>{userInfo.courses.length} course</span>
          <span>
            {userCoursesCertificates && userCoursesCertificates.length}{" "}
            certificates
          </span>
        </div>
      )}
    </div>
  );
};

export default UserInfo;

import React from "react";
import { useSelector } from "react-redux";
import { getUserInfo } from "../../redux/user/selectors";
import { getAllCourses } from "../../redux/course/selectors";
import UserCertificatesItem from "./UserCertificatesItem";
import styles from "./UserCertificatesList.module.scss";

const UserCertificatesList = () => {
  const certificates = useSelector(getUserInfo)?.certificates;
  const courses = useSelector(getAllCourses);

  console.log(certificates);
  console.log(courses);

  return (
    <ul className={styles.certificatesList}>
      {certificates.map(
        ({
          course_certificate_data: coursesCertificates,
          ...categoryCertificate
        }) => {
          return (
            <li key={categoryCertificate.category_certificate_id}>
              <UserCertificatesItem
                certificate={categoryCertificate}
                type="category"
              />
              <ul className={`${styles.certificatesList}`}>
                {coursesCertificates.map((courseCertificate) => (
                  <li key={courseCertificate.course_certificate_id}>
                    <UserCertificatesItem
                      certificate={courseCertificate}
                      type="course"
                    />
                  </li>
                ))}
              </ul>
            </li>
          );
        }
      )}
    </ul>
  );
};

export default UserCertificatesList;

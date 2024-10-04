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
      {certificates.map((certificate) => {
        const courseTitle = courses.find(
          ({ id }) => id === certificate.course_id
        )?.title;

        return (
          <UserCertificatesItem
            key={certificate.id}
            title={courseTitle}
            certificate={certificate}
          />
        );
      })}
      {certificates.map((certificate) => {
        const courseTitle = courses.find(
          ({ id }) => id === certificate.course_id
        )?.title;

        return (
          <UserCertificatesItem
            key={certificate.id}
            title={courseTitle}
            certificate={certificate}
          />
        );
      })}
      {certificates.map((certificate) => {
        const courseTitle = courses.find(
          ({ id }) => id === certificate.course_id
        )?.title;

        return (
          <UserCertificatesItem
            key={certificate.id}
            title={courseTitle}
            certificate={certificate}
          />
        );
      })}
      {certificates.map((certificate) => {
        const courseTitle = courses.find(
          ({ id }) => id === certificate.course_id
        )?.title;

        return (
          <UserCertificatesItem
            key={certificate.id}
            title={courseTitle}
            certificate={certificate}
          />
        );
      })}
      {certificates.map((certificate) => {
        const courseTitle = courses.find(
          ({ id }) => id === certificate.course_id
        )?.title;

        return (
          <UserCertificatesItem
            key={certificate.id}
            title={courseTitle}
            certificate={certificate}
          />
        );
      })}
      {certificates.map((certificate) => {
        const courseTitle = courses.find(
          ({ id }) => id === certificate.course_id
        )?.title;

        return (
          <UserCertificatesItem
            key={certificate.id}
            title={courseTitle}
            certificate={certificate}
          />
        );
      })}
      {certificates.map((certificate) => {
        const courseTitle = courses.find(
          ({ id }) => id === certificate.course_id
        )?.title;

        return (
          <UserCertificatesItem
            key={certificate.id}
            title={courseTitle}
            certificate={certificate}
          />
        );
      })}
      {certificates.map((certificate) => {
        const courseTitle = courses.find(
          ({ id }) => id === certificate.course_id
        )?.title;

        return (
          <UserCertificatesItem
            key={certificate.id}
            title={courseTitle}
            certificate={certificate}
          />
        );
      })}
      {certificates.map((certificate) => {
        const courseTitle = courses.find(
          ({ id }) => id === certificate.course_id
        )?.title;

        return (
          <UserCertificatesItem
            key={certificate.id}
            title={courseTitle}
            certificate={certificate}
          />
        );
      })}
      {certificates.map((certificate) => {
        const courseTitle = courses.find(
          ({ id }) => id === certificate.course_id
        )?.title;

        return (
          <UserCertificatesItem
            key={certificate.id}
            title={courseTitle}
            certificate={certificate}
          />
        );
      })}
      {certificates.map((certificate) => {
        const courseTitle = courses.find(
          ({ id }) => id === certificate.course_id
        )?.title;

        return (
          <UserCertificatesItem
            key={certificate.id}
            title={courseTitle}
            certificate={certificate}
          />
        );
      })}
    </ul>
  );
};

export default UserCertificatesList;

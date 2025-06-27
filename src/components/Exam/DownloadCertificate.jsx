import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../redux/user/selectors";
import { getAllCourses } from "../../redux/course/selectors";
import { getUserCertificatesThunk } from "../../redux/user/operations";
import { serverName } from "../../http/server";
import Spinner from "../Spinner/Spinner";
import styles from "./Exam.module.scss";

const DownloadCertificate = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const courses = useSelector(getAllCourses);
  const categoryId = courses.find(
    (course) => course.id === +courseId
  )?.category_id;
  const userInfo = useSelector(getUserInfo);
  const userCertificates = userInfo.certificates;
  const intervalRef = useRef();
  console.log(userCertificates);

  const courseCertificateData = userCertificates
    ? userCertificates
        .find(
          (categoryCertificate) =>
            categoryCertificate.category_id === categoryId
        )
        ?.course_certificate_data.find(
          (courseCertificate) => courseCertificate.course_id === +courseId
        )
    : null;

  const certificateLink = courseCertificateData?.course_certificate_link;

  const handleDownloadCertificate = () => {
    if (!certificateLink) return;

    const downloadUrl = `${serverName}/${certificateLink}`;

    fetch(downloadUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `Certificate_${courseCertificateData.course_name}.pdf`
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => console.error("Download failed", error));
  };

  useEffect(() => {
    if (!certificateLink && !intervalRef.current && userInfo.studentId) {
      intervalRef.current = setInterval(
        () => dispatch(getUserCertificatesThunk(userInfo.studentId)),
        60000
      );
    } else {
      clearInterval(intervalRef.current);
    }
    // eslint-disable-next-line
  }, [certificateLink, intervalRef.current, userInfo.studentId]);

  return (
    <button
      className={styles.primaryBtn}
      disabled={!certificateLink}
      onClick={handleDownloadCertificate}
    >
      {!certificateLink ? (
        <span>Download Certificate</span>
      ) : (
        <>
          <span>Generating </span>
          <Spinner contrastColor={true}/>
        </>
      )}
    </button>
  );
};

export default DownloadCertificate;

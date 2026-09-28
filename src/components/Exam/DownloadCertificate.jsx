import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../redux/user/selectors";
import { getAllCourses } from "../../redux/course/selectors";
import { getUserCertificatesThunk } from "../../redux/user/operations";
import { downloadCertificate } from "../../utils/downloadCertificate";
import Spinner from "../Spinner/Spinner";
import styles from "./Exam.module.scss";

const DownloadCertificate = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();

  const courses = useSelector(getAllCourses);
  const userInfo = useSelector(getUserInfo);

  const currentCourseId = Number(courseId);
  const studentId = userInfo?.studentId;
  const userCertificates = userInfo?.certificates;

  const categoryId = courses?.find(
    (course) => course.id === currentCourseId,
  )?.category_id;

  const courseCertificateData = userCertificates
    ?.find((cert) => cert.category_id === categoryId)
    ?.course_certificate_data?.find(
      (cert) => cert.course_id === currentCourseId,
    );

  const certificateLink = courseCertificateData?.course_certificate_link;
  const courseName = courses.find(
    (course) => course.id === currentCourseId,
  ).title;

  const intervalRef = useRef(null);

  useEffect(() => {
    if (!studentId || certificateLink) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    dispatch(getUserCertificatesThunk(studentId));

    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        dispatch(getUserCertificatesThunk(studentId));
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    // eslint-disable-next-line
  }, [certificateLink, studentId]);

  return (
    <button
      className={styles.primaryBtn}
      disabled={!certificateLink}
      onClick={() => downloadCertificate(certificateLink, courseName)}
    >
      {certificateLink ? (
        <span>Download Certificate</span>
      ) : (
        <>
          <span>Generating </span>
          <Spinner contrastColor={true} />
        </>
      )}
    </button>
  );
};

export default DownloadCertificate;

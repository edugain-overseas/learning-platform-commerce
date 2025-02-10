import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllCourses } from "../../../redux/course/selectors";
import useMessage from "antd/es/message/useMessage";
import Spinner from "../../../components/Spinner/Spinner";
import LessonsTable from "./LessonTable";
import PublishCourseBtn from "./PublishCourseBtn";
import PublishingErrorComponent from "./PublishingErrorComponent";
import styles from "./CoursePublishPage.module.scss";

const CoursePublishPage = () => {
  const { courseId } = useParams();
  const [error, setError] = useState(null);

  const course = useSelector(getAllCourses).find(({ id }) => id === +courseId);
  const courseLessons = course?.lessons;
  const lessonsTableData = courseLessons
    ? courseLessons.map((lesson, index) => ({ ...lesson, key: `${index}` }))
    : [];
  const isCoursePublished = course?.is_published;

  const [messageApi, contextHolder] = useMessage();

  if (!courseLessons) {
    return (
      <div className={styles.pageLoadingContainer}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      {contextHolder}
      {!error ? (
        <LessonsTable
          lessonsTableData={[...lessonsTableData].sort(
            (a, b) => a.number - b.number
          )}
          courseTitle={course.title}
          isCoursePublished={isCoursePublished}
          messageApi={messageApi}
        />
      ) : (
        <PublishingErrorComponent
          error={error}
          lessonsTableData={lessonsTableData}
        />
      )}
      {!isCoursePublished && (
        <PublishCourseBtn
          setError={setError}
          messageApi={messageApi}
          courseId={courseId}
        />
      )}
    </div>
  );
};

export default CoursePublishPage;

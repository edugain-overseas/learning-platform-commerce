import React, { useEffect } from "react";
import styles from "./CourseCerificatePage.module.scss";
import Exam from "../../../components/Exam/Exam";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../../redux/course/selectors";
import { getAllLessons } from "../../../redux/lesson/selectors";
import { getLessonByIdThunk } from "../../../redux/lesson/operation";

const CourseCerificatePage = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const course = useSelector(getAllCourses)?.find(
    (course) => course.id === +courseId
  );
  const lessons = useSelector(getAllLessons);
  const exam = course?.lessons?.find((lesson) => lesson.type === "exam");
  const examId = exam?.id;
  const examData = lessons?.find((lesson) => lesson.id === examId);

  useEffect(() => {
    if (examId && !examData) {
      dispatch(getLessonByIdThunk(examId));
    }
    // eslint-disable-next-line
  }, [examId]);

  return (
    <div className={styles.container}>
      {examData && <Exam exam={examData} />}
    </div>
  );
};

export default CourseCerificatePage;

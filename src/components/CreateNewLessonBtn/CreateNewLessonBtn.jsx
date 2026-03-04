import React, { useState } from "react";
import { ReactComponent as PlusIcon } from "../../images/icons/plus.svg";
import LessonModal from "./LessonModal";
import styles from "./CreateNewLessonBtn.module.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllCourses } from "../../redux/course/selectors";

const CreateNewLessonBtn = ({
  lessonNumber,
  classname = "",
  label = "Create new lesson",
  lessonConstructorCourseId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { courseId } = useParams();
  const courses = useSelector(getAllCourses);
  const targetCourseId = courseId ? +courseId : lessonConstructorCourseId;

  const isCoursePublished = courses.find(
    (course) => course.id === targetCourseId
  ).is_published;

  console.log(isCoursePublished);

  return (
    <>
      <button
        className={`${styles.createLessonBtn} ${classname}`}
        onClick={() => setIsOpen(true)}
      >
        <PlusIcon />
        <span>{label}</span>
      </button>
      <LessonModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        lessonNumber={lessonNumber}
        lessonConstructorCourseId={lessonConstructorCourseId}
      />
    </>
  );
};

export default CreateNewLessonBtn;

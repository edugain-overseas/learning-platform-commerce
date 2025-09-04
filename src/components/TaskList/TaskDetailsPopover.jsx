import React, { useState } from "react";
import { Popover } from "antd";
import { ReactComponent as DetailsIcon } from "../../images/icons/details.svg";
import { ReactComponent as EditIcon } from "../../images/icons/edit.svg";
import { ReactComponent as DeleteIcon } from "../../images/icons/delete.svg";
import "../../styles/antDesign/Popover.css";
import { useSelector } from "react-redux";
import { getAllCourses } from "../../redux/course/selectors";
import { useParams } from "react-router-dom";
import LessonModal from "../CreateNewLessonBtn/LessonModal";
import styles from "./TaskList.module.scss";

const EditLesson = ({ lessonId, onClickCallback }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { courseId } = useParams();
  const lessonData = useSelector(getAllCourses)
    .find((course) => course.id === +courseId)
    .lessons.find((lesson) => lesson.id === lessonId);

  const handleClick = () => {
    onClickCallback?.();
    setIsOpenModal(true);
  };

  return (
    <>
      <button className={styles.detailsOptionButton} onClick={handleClick}>
        <EditIcon />
        <span>Edit</span>
      </button>
      {lessonData && <LessonModal
        isOpen={isOpenModal}
        closeModal={() => setIsOpenModal(false)}
        lessonData={lessonData}
        lessonNumber={lessonData?.number}
      />}
    </>
  );
};

const DeleteLesson = () => {
  return (
    <button className={styles.detailsOptionButton}>
      <DeleteIcon />
      <span>Delete</span>
    </button>
  );
};

const DetailsPopoverContent = ({ lessonId, closePopover }) => {
  return (
    <ul>
      <li>
        <EditLesson lessonId={lessonId} onClickCallback={closePopover} />
      </li>
      <li>
        <DeleteLesson />
      </li>
    </ul>
  );
};

const TaskDetailsPopover = ({ lessonId }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover
      content={
        <DetailsPopoverContent
          lessonId={lessonId}
          closePopover={() => setIsOpen(false)}
        />
      }
      trigger="click"
      placement="leftTop"
      arrow={false}
      open={isOpen}
      onOpenChange={(newOpen) => setIsOpen(newOpen)}
    >
      <button className={styles.detailsBtn}>
        <DetailsIcon />
      </button>
    </Popover>
  );
};

export default TaskDetailsPopover;

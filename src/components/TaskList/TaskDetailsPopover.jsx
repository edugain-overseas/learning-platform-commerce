import React, { useState } from "react";
import { message, Popconfirm, Popover } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllCourses } from "../../redux/course/selectors";
import { ReactComponent as DetailsIcon } from "../../images/icons/details.svg";
import { ReactComponent as EditIcon } from "../../images/icons/edit.svg";
import { ReactComponent as DeleteIcon } from "../../images/icons/delete.svg";
import "../../styles/antDesign/Popover.css";
import LessonModal from "../CreateNewLessonBtn/LessonModal";
import "../../styles/antDesign/Popconfirm.css";
import styles from "./TaskList.module.scss";
import { deleteLessonThunk } from "../../redux/lesson/operation";

const EditLesson = ({ lessonId, onClickCallback }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { courseId } = useParams();
  const lessonData = useSelector(getAllCourses)
    ?.find((course) => course.id === +courseId)
    .lessons?.find((lesson) => lesson.id === lessonId);

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
      {lessonData && (
        <LessonModal
          isOpen={isOpenModal}
          closeModal={() => setIsOpenModal(false)}
          lessonData={lessonData}
          lessonNumber={lessonData?.number}
        />
      )}
    </>
  );
};

const DeleteLesson = ({ lessonId, onClickCallback }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const handleDelete = async () => {
    setIsDeleteLoading(true);

    try {
      await dispatch(
        deleteLessonThunk({ courseId: +courseId, lessonId })
      ).unwrap();
      message.success({
        content: "Lesson successfully deleted",
        duration: 3,
      });

      setIsOpen(false);
      onClickCallback?.();
    } catch (error) {
      message.error({ content: "Something went wrong!", duration: 3 });
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    onClickCallback?.();
  };

  return (
    <>
      <Popconfirm
        title={<span className={styles.popconfirmTitle}>Delete lesson</span>}
        description={
          <span className={styles.popconfirmDescription}>
            Are you sure to delete this lesson?
          </span>
        }
        placement="leftTop"
        icon={<DeleteIcon />}
        overlayClassName="deletePopconfirm"
        okText="Delete"
        onConfirm={handleDelete}
        onCancel={handleCancel}
        open={isOpen}
        okButtonProps={{ loading: isDeleteLoading }}
        onOpenChange={(newOpen) => setIsOpen(false)}
      >
        <button
          className={styles.detailsOptionButton}
          onClick={() => setIsOpen(true)}
        >
          <DeleteIcon />
          <span>Delete</span>
        </button>
      </Popconfirm>
    </>
  );
};

const DetailsPopoverContent = ({ lessonId, closePopover }) => {
  return (
    <ul>
      <li>
        <EditLesson lessonId={lessonId} onClickCallback={closePopover} />
      </li>
      <li>
        <DeleteLesson lessonId={lessonId} onClickCallback={closePopover} />
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

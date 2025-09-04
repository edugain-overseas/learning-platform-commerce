import React from "react";
import Modal from "../shared/Modal/Modal";
import LessonForm from "../LessonForm/LessonForm";
import styles from "./CreateNewLessonBtn.module.scss";

const LessonModal = ({ isOpen, closeModal, lessonData, lessonNumber }) => {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal} width="auto">
      <div className={styles.modalHeader}>
        <h4>{!lessonData ? "New Lesson" : "Edit Lesson"}</h4>
      </div>
      <LessonForm
        lessonNumber={lessonNumber}
        closeModal={closeModal}
        lessonData={lessonData}
      />
    </Modal>
  );
};

export default LessonModal;

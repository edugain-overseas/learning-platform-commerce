import React, { useState } from "react";
import { ReactComponent as PlusIcon } from "../../images/icons/plus.svg";
import styles from "./CreateNewLessonBtn.module.scss";
import Modal from "../shared/Modal/Modal";
import CreateNewLessonForm from "../CreateNewLessonForm/CreateNewLessonForm";

const CreateNewLessonBtn = ({ lessonNumber }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        className={styles.createLessonBtn}
        onClick={() => setIsOpen(true)}
      >
        <PlusIcon />
        <span>Create new lesson</span>
      </button>
      <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)} width="auto">
        <div className={styles.modalHeader}>
          <h4>New Lesson</h4>
        </div>
        <CreateNewLessonForm
          lessonNumber={lessonNumber}
          closeModal={() => setIsOpen(false)}
        />
      </Modal>
    </>
  );
};

export default CreateNewLessonBtn;

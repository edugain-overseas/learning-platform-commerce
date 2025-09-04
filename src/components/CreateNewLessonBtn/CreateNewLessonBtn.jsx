import React, { useState } from "react";
import { ReactComponent as PlusIcon } from "../../images/icons/plus.svg";
// import Modal from "../shared/Modal/Modal";
// import CreateNewLessonForm from "../CreateNewLessonForm/CreateNewLessonForm";
import LessonModal from "./LessonModal";
import styles from "./CreateNewLessonBtn.module.scss";

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
      <LessonModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        lessonNumber={lessonNumber}
      />
    </>
  );
};

export default CreateNewLessonBtn;

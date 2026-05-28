import React from "react";
import { useLeaveConfirm } from "../../../hooks/useLeaveConfirm";
import Modal from "../Modal/Modal";
import CommonButton from "../CommonButton/CommonButton";
import styles from "./NavigationGuard.module.scss";

const NavigationGuard = ({
  isDirty,
  title = "Unsaved Changes",
  content = "Are you sure you want to leave this page? Your unsaved progress will be lost.",
}) => {
  const { isOpen, confirm, cancel } = useLeaveConfirm(isDirty);

  return (
    <Modal isOpen={isOpen} closeModal={cancel} width="450rem">
      <div className={styles.confirmModalContent}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.text}>{content}</p>

        <div className={styles.actions}>
          <CommonButton
            text="Stay"
            variant="lightGrey"
            hoverVariant="darkBlue"
            onClick={cancel}
          />
          <CommonButton
            text="Leave page"
            variant="red"
            hoverVariant="red"
            onClick={confirm}
            wrapperStyles={{
              color: "var(--content-light-secondary)",
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default NavigationGuard;

import React, { useState } from "react";
import Modal from "../shared/Modal/Modal";
import CommonButton from "../shared/CommonButton/CommonButton";
import Spinner from "../Spinner/Spinner";
import styles from "./Exam.module.scss";

const buttonWrapperStyles = {
  width: "108rem",
  height: "28rem",
  fontFamily: "Roboto",
  fontSize: "12rem",
};

const LeaveModal = ({ isOpen, confirm, cancel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const confirmLeave = async () => {
    try {
      setIsLoading(true);
      await confirm();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal isOpen={isOpen} closeModal={cancel} width="700rem">
      <div className={styles.leaveModalContainer}>
        <h4>PLEASE NOTE!</h4>
        <p>
          <b>If you leave the exam now</b>, your result will be calculated based
          on your current progress and may not be fully counted.
        </p>
        <div className={styles.leaveModalBtnsContainer}>
          {isLoading ? (
            <Spinner height={28}/>
          ) : (
            <>
              <CommonButton
                text="Continue exam"
                variant="darkBlue"
                hoverVariant="lightBlue"
                wrapperStyles={buttonWrapperStyles}
                onClick={cancel}
              />
              <CommonButton
                text="Leave the exam"
                variant="transparentTextLight"
                hoverVariant="lightGrey"
                wrapperStyles={buttonWrapperStyles}
                onClick={confirmLeave}
              />
            </>
          )}
        </div>
        <p className={styles.leaveModalDesciption}>
          Click Exit to leave the exam and save your current result. Click
          Continue exam to continue the exam.
        </p>
      </div>
    </Modal>
  );
};

export default LeaveModal;

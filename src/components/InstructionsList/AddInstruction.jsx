import React, { useState } from "react";
import Modal from "../shared/Modal/Modal";
import { ReactComponent as PlusIcon } from "../../images/icons/plus.svg";
import styles from "./InstructionsList.module.scss";
import InstructionForm from "./InstructionForm";

const AddInstruction = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={styles.openAddModalBtn}
      >
        <span>Add instruction</span>
        <PlusIcon />
      </button>
      <Modal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        width="80%"
        height="80%"
      >
        <div className={styles.modalWrapper}>
          <h3>New Instruction</h3>
          <InstructionForm />
        </div>
      </Modal>
    </>
  );
};

export default AddInstruction;

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { ReactComponent as PlusIcon } from "../../images/icons/plus.svg";
import Modal from "../shared/Modal/Modal";
import InstructionForm from "./InstructionForm";
import styles from "./InstructionsList.module.scss";

const AddInstruction = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { pathname } = useLocation();
  const formType = pathname.includes("general") ? "general" : "course";

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
        <InstructionForm type={formType} afterSubmit={()=>setIsModalOpen(false)}/>
      </Modal>
    </>
  );
};

export default AddInstruction;

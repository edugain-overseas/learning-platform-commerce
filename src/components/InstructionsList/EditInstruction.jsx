import React, { useState } from "react";
import { ReactComponent as EditIcon } from "../../images/icons/edit.svg";
import { useSelector } from "react-redux";
import { getAllInstructions } from "../../redux/instruction/selectors";
import Modal from "../shared/Modal/Modal";
import InstructionForm from "./InstructionForm";
import styles from "./InstructionsList.module.scss";

const EditInstruction = ({ instructionId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const instructionData = useSelector(getAllInstructions).find(
    (instr) => instr.id === instructionId
  );

  return (
    <>
      <button className={styles.editBtn} onClick={() => setIsModalOpen(true)}>
        <EditIcon />
      </button>
      <Modal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        width="80%"
        height="80%"
      >
        {isModalOpen && (
          <InstructionForm
            type={instructionData.type}
            afterSubmit={() => setIsModalOpen(false)}
            defaultValues={instructionData}
          />
        )}
      </Modal>
    </>
  );
};

export default EditInstruction;

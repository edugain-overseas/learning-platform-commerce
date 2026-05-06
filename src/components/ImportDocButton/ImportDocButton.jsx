import React, { useState } from "react";
import CommonButton from "../shared/CommonButton/CommonButton";
import Modal from "../shared/Modal/Modal";
import DocumentToTaskParser from "../DocumentToTaskContructor/DocumentToTaskParser";

const ImportDocButton = ({ type }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div>
      <CommonButton
        text="Import document"
        onClick={() => setIsOpenModal(true)}
        wrapperStyles={{ width: "100%", marginBottom: "16rem" }}
      />
      <Modal
        isOpen={isOpenModal}
        closeModal={() => setIsOpenModal(false)}
        height="96vh"
        width="96vw"
      >
        <DocumentToTaskParser
          closeModal={() => setIsOpenModal(false)}
          type={type}
        />
      </Modal>
    </div>
  );
};

export default ImportDocButton;

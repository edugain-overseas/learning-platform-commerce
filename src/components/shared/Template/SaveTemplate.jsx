import React, { useState } from "react";
import { FolderAddOutlined } from "@ant-design/icons";
import Modal from "../Modal/Modal";
import styles from "./Template.module.scss";
import SaveTemplateForm from "./SaveTemplateForm";
import { useLectureConstructor } from "../../../context/LectureConstructorContext";

const SaveTemplate = ({ type }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const {blocks} = useLectureConstructor();

  const saveTemplate = (title) => {
    const data = {
      title,
      type,
      template_data: blocks,
    };

    console.log(data);
  };

  return (
    <>
      <button
        className={styles.openSaveNewTemplateModal}
        onClick={() => setIsOpenModal(true)}
      >
        <FolderAddOutlined />
      </button>
      <Modal
        isOpen={isOpenModal}
        closeModal={() => setIsOpenModal(false)}
        width="600rem"
      >
        <SaveTemplateForm type={type} handleSave={saveTemplate} />
      </Modal>
    </>
  );
};

export default SaveTemplate;

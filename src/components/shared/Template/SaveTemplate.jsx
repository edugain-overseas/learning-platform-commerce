import React, { useState } from "react";
import { FolderAddOutlined } from "@ant-design/icons";
import Modal from "../Modal/Modal";
import styles from "./Template.module.scss";

const SaveTemplate = ({ type, templateData }) => {
  console.log(type, templateData);
  const [isOpenModal, setIsOpenModal] = useState(false);
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
      ></Modal>
    </>
  );
};

export default SaveTemplate;

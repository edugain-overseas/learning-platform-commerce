import React, { useState } from "react";
import { ReactComponent as FolderAddOutlined } from "../../../images/icons/folder-plus-outlined.svg";
import { useDispatch } from "react-redux";
import { createTemplateByTypeThunk } from "../../../redux/template/operation";
import { useLectureConstructor } from "../../../context/LectureConstructorContext";
import { useNotificationMessage } from "../../../hooks/useNotificationMessage";
import { useTestContructor } from "../../../context/TestContructorContext";
import SaveTemplateForm from "./SaveTemplateForm";
import Modal from "../Modal/Modal";
import styles from "./Template.module.scss";

const SaveTemplate = ({ type }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [messageApi, contextHolder] = useNotificationMessage();
  const dispatch = useDispatch();

  const lectureBlocks = useLectureConstructor()?.blocks;
  const testBlocks = useTestContructor()?.blocks;

  const blocks = type === "lecture" ? lectureBlocks : testBlocks;

  const saveTemplate = (title) => {
    if (title.trim() === "") {
      messageApi.error({
        content: "Title of template is required",
        duration: 3,
      });
      return;
    }

    const templateData = {
      title,
      template_data: blocks,
    };

    dispatch(createTemplateByTypeThunk({ type, templateData }))
      .unwrap()
      .then((response) => {
        messageApi.success({ content: response.message, duration: 3 });
        setIsOpenModal(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {contextHolder}
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

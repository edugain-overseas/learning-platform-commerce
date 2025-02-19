import React, { useState } from "react";
import { FolderAddOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { createTemplateByTypeThunk } from "../../../redux/template/operation";
import { getIsTemplateLoading } from "../../../redux/template/selectors";
import { useLectureConstructor } from "../../../context/LectureConstructorContext";
import useMessage from "antd/es/message/useMessage";
import SaveTemplateForm from "./SaveTemplateForm";
import Modal from "../Modal/Modal";
import styles from "./Template.module.scss";
import { useTestContructor } from "../../../context/TestContructorContext";

const SaveTemplate = ({ type }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [messageApi, contextHolder] = useMessage();
  const isLoading = useSelector(getIsTemplateLoading);
  const dispatch = useDispatch();

  const lectureBlocks = useLectureConstructor()?.blocks;
  const testBlocks = useTestContructor()?.blocks;

  const blocks = type === "lecture" ? lectureBlocks : testBlocks;

  console.log(isLoading);

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
      });
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

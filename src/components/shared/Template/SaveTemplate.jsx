import React, { useState } from "react";
import { FolderAddOutlined } from "@ant-design/icons";
import Modal from "../Modal/Modal";
import styles from "./Template.module.scss";
import SaveTemplateForm from "./SaveTemplateForm";
import { useLectureConstructor } from "../../../context/LectureConstructorContext";
import { useDispatch, useSelector } from "react-redux";
import { createTemplateByTypeThunk } from "../../../redux/template/operation";
import useMessage from "antd/es/message/useMessage";
import { getIsTemplateLoading } from "../../../redux/template/selectors";

const SaveTemplate = ({ type }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [messageApi, contextHolder] = useMessage();
  const isLoading = useSelector(getIsTemplateLoading)
  const dispatch = useDispatch();

  const { blocks } = useLectureConstructor();

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
      type,
      template_data: blocks,
    };
    console.log(templateData);

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

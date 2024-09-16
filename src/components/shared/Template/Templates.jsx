import React, { useState } from "react";
import {
  FolderOpenOutlined,
  FolderOutlined,
  FolderViewOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllTemplates } from "../../../redux/template/selectors";
import useMessage from "antd/es/message/useMessage";
import { Popover } from "antd";
import { ReactComponent as TrashIcon } from "../../../images/icons/trashRounded.svg";
import { getTemplateByIdAndType } from "../../../http/services/template";
import { useLectureConstructor } from "../../../context/LectureConstructorContext";
import { generateId } from "../../../utils/generateIdBasedOnTime";
import { deleteTemplateByIdThunk } from "../../../redux/template/operation";
import Modal from "../Modal/Modal";
import LectureContent from "../../Lecture/LectureContent";
import Spinner from "../../Spinner/Spinner";
import styles from "./Template.module.scss";
import "../../TasksHeader/AntPopoverStyles.css";

const TemplatesList = ({ type, closePopover }) => {
  const dispatch = useDispatch();
  const setBlocks = useLectureConstructor().setBlocks;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [templatesDetails, setTemplatesDetails] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [messageApi, contextHolder] = useMessage();

  const templates = useSelector(getAllTemplates).filter(
    (template) => template.type === type
  );

  const selectedTemplateDetails = templatesDetails.find(
    ({ id }) => id === selectedTemplateId
  );

  const selectedTemplateData = selectedTemplateDetails?.[`${type}_template`];
  const selectedTemplateTitle = selectedTemplateDetails?.title;

  const fetchTemplateDetails = async (id) => {
    setIsLoading(true);
    try {
      const response = await getTemplateByIdAndType(id, type);
      const newTemplateDetails = {
        ...response,
        [`${type}_template`]: response[`${type}_template`].map(
          ({ a_id, ...rest }, index) => ({
            ...rest,
            id: generateId() + index,
          })
        ),
      };
      setTemplatesDetails((prev) => [...prev, newTemplateDetails]);
      setIsLoading(false);
      return newTemplateDetails;
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const selectTemplate = async (id) => {
    setSelectedTemplateId(id);
    if (
      !templatesDetails.find((templateDetails) => templateDetails.id === id)
    ) {
      await fetchTemplateDetails(id);
    }
  };

  const handleShowTemplate = async (id) => {
    await selectTemplate(id);
    console.log(selectedTemplateData);
    setIsModalOpen(true);
  };

  const handleUseTemplate = async (id) => {
    if (templatesDetails.find((templateDetails) => templateDetails.id === id)) {
      const templateData = templatesDetails.find(
        (templateDetails) => templateDetails.id === id
      )[`${type}_template`];
      setBlocks(templateData);
    } else {
      const template = await fetchTemplateDetails(id);
      const templateData = template[`${type}_template`];
      setBlocks(templateData);
    }
    closePopover();
  };

  const handleUseTemplateFromModal = () => {
    setBlocks(selectedTemplateData);
    setIsModalOpen(false);
    closePopover();
  };

  const deleteTemplate = (id) => {
    dispatch(deleteTemplateByIdThunk(id))
      .unwrap()
      .then((response) => {
        messageApi.success({
          content: response.message,
          duration: 3,
        });
      });
  };

  return (
    <>
      {contextHolder}
      <ul className={styles.templatesList}>
        {templates.map(({ id, title }) => (
          <li key={id}>
            <div className={styles.templateHeader}>
              <button
                className={styles.showBtn}
                onClick={() => handleShowTemplate(id)}
              >
                <FolderViewOutlined />
                <span>{title}</span>
              </button>
              <button
                className={styles.deleteBtn}
                onClick={() => deleteTemplate(id)}
              >
                <TrashIcon />
              </button>
            </div>
            <div className={styles.btnsWrapper}>
              <button
                className={styles.useBtn}
                onClick={() => handleUseTemplate(id)}
              >
                <span>use template</span>
                <FolderOpenOutlined />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Modal
        width="80%"
        contentWrapperStyles={{ maxHeight: "90%", overflow: "auto" }}
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      >
        <h4 className={styles.templateTitle}>{selectedTemplateTitle}</h4>
        <LectureContent
          isTemplate={true}
          tepmplateData={selectedTemplateData ? selectedTemplateData : []}
        />
        <div className={styles.modalBtnsWrapper}>
          <button
            className={styles.useBtn}
            onClick={() => handleUseTemplateFromModal()}
          >
            <span>Use template</span>
            <FolderOpenOutlined />
          </button>
        </div>
      </Modal>
      {isLoading && (
        <div className={styles.spinnerWrapper}>
          <Spinner />
        </div>
      )}
    </>
  );
};

const Templates = ({ type }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (newOpen) => {
    setIsOpen(newOpen);
  };

  //   const closePopOver = () => handleOpenChange(false);

  return (
    <Popover
      rootClassName="custom-popover"
      placement="bottomRight"
      arrow={false}
      zIndex={998}
      trigger="click"
      open={isOpen}
      onOpenChange={handleOpenChange}
      title={<span className={styles.templatesTitle}>Saved templates</span>}
      content={
        <TemplatesList type={type} closePopover={() => setIsOpen(false)} />
      }
    >
      <button className={styles.openTemplatesBtn}>
        <FolderOutlined />
      </button>
    </Popover>
  );
};

export default Templates;

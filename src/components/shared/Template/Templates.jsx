import React, { useState } from "react";
import { FolderOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import "../../TasksHeader/AntPopoverStyles.css";
import styles from "./Template.module.scss";

const TemplatesList = ({ type }) => {
  console.log(type);
  return <ul></ul>;
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
      zIndex={998}
      trigger="click"
      open={isOpen}
      onOpenChange={handleOpenChange}
      title={<span className={styles.templatesTitle}>Saved templates</span>}
      content={<TemplatesList />}
    >
      <button className={styles.openTemplatesBtn}>
        <FolderOutlined />
      </button>
    </Popover>
  );
};

export default Templates;

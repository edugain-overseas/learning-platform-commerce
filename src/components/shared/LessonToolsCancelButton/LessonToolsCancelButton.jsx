import React from "react";
import { Popconfirm } from "antd";
import styles from "./LessonToolsCancelButton.module.scss";
import "../../../styles/antDesign/Popconfirm.css";

const LessonToolsCancelButton = ({
  handleClear,
  type = "lecture",
  disabled = false,
}) => {
  const text = type === "lecture" ? "Clear lecture" : "Clear test";

  return (
    <Popconfirm
      title={<span className={styles.popoverTitle}>Are you sure you want to delete all content?</span>}
      onConfirm={handleClear}
      okText="Confirm"
      cancelText="Cancel"
      placement="topRight"
      overlayClassName="deletePopconfirm"
      icon={null}
    >
      <button className={styles.clearButton} disabled={disabled}>
        <span>{text}</span>
      </button>
    </Popconfirm>
  );
};

export default LessonToolsCancelButton;

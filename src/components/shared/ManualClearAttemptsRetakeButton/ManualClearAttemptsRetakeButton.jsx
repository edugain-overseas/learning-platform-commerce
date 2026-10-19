import { useState } from "react";
import { Popconfirm } from "antd";
import styles from "./ManualClearAttemptsRetakeButton.module.scss";

const ManualClearAttemptsRetakeButton = ({ handleClear }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Popconfirm
      okText={<span>Yes</span>}
      okButtonProps={{
        danger: true,
        classNames: { root: styles.clearAttemptsPopconfirmOkButton },
        loading: isLoading,
      }}
      cancelText="Cancel"
      cancelButtonProps={{
        classNames: { root: styles.clearAttemptsPopconfirmCancelButton },
      }}
      title={
        <span className={styles.clearAttemptsPopconfirmTitle}>
          You've run out of attempts
        </span>
      }
      description={
        <span className={styles.clearAttemptsPopconfirmContent}>
          Are you sure you want to clear all previous attempts? This action
          cannot be undone.
        </span>
      }
      classNames={{
        container: styles.clearAttemptsPopconfirmContainer,
      }}
      icon={null}
      onConfirm={async () => {
        try {
          setIsLoading(true);
          await handleClear();
        } finally {
          setIsLoading(false);
        }
      }}
    >
      <button className={styles.clearAttemptsButton}>
        <span>Retake</span>
      </button>
    </Popconfirm>
  );
};

export default ManualClearAttemptsRetakeButton;

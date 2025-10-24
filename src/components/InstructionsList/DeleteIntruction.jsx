import React from "react";
import { useNotificationMessage } from "../../hooks/useNotificationMessage";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { ReactComponent as TrashIcon } from "../../images/icons/trashRounded.svg";
import { deleteInstructionThunk } from "../../redux/instruction/operations";
import styles from "./InstructionsList.module.scss";

const DeleteIntruction = ({ instructionId }) => {
  const [messageApi, contextHolder] = useNotificationMessage();
  const dispatch = useDispatch();

  const deleteIntruction = async () => {
    try {
      await dispatch(deleteInstructionThunk(instructionId)).unwrap();
      message.success("Instruction successfully deleted", 2.5);
    } catch (error) {
      messageApi.error({
        content: "Something went wrong!",
        duration: 2.5,
      });
    }
  };

  return (
    <>
      {contextHolder}
      <button className={styles.deleteBtn} onClick={deleteIntruction}>
        <TrashIcon />
      </button>
    </>
  );
};

export default DeleteIntruction;

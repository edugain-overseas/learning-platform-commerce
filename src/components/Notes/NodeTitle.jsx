import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FolderAddOutlined } from "@ant-design/icons";
import { deleteNotesFolderThunk } from "../../redux/user/operations";
import { ReactComponent as DeleteIcon } from "../../images/icons/trashRounded.svg";
import { Popconfirm } from "antd";
import styles from "./Notes.module.scss";
import "../../styles/antDesign/Popconfirm.css";

const NodeTitle = ({ title, id, handleShowAddChildNode }) => {
  const [confirmDeleteLoading, setConfirmDeleteLoading] = useState(false);
  const dispatch = useDispatch();

  const handeDeleteNode = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setConfirmDeleteLoading(true);
    dispatch(deleteNotesFolderThunk(id))
      .unwrap()
      .then(() => {
        setConfirmDeleteLoading(false);
      });
  };

  return (
    <div className={styles.nodeTitleWrapper}>
      <span className={styles.nodeTitle} id="notes-tree-select-title">
        {title}
      </span>
      <button
        className={styles.showAddChildNode}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          handleShowAddChildNode(id);
        }}
      >
        <FolderAddOutlined />
      </button>
      <Popconfirm
        title="Delete the folder"
        description="Are you sure to delete this folder and all child folders?"
        onConfirm={handeDeleteNode}
        onCancel={(e) => e.stopPropagation()}
        okText="Yes"
        okButtonProps={{
          loading: confirmDeleteLoading,
        }}
        cancelText="No"
        overlayClassName="notes-popconfirm"
      >
        <button
          className={styles.deleteNodeBtn}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <DeleteIcon />
        </button>
      </Popconfirm>
    </div>
  );
};

export default NodeTitle;

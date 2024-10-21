import React from "react";
import { Popover } from "antd";
import { ReactComponent as AttachIcon } from "../../../images/icons/pin.svg";
import styles from "./ChatInput.module.scss";
import AttachedFilesList from "./AttachedFilesList";

const ChatAttachFile = ({ files, addFile, removeFile }) => {
  return (
    <Popover
      title={<h4 className={styles.attachedFilesTitle}>Attached files</h4>}
      content={<AttachedFilesList files={files} addFile={addFile} removeFile={removeFile}/>}
      trigger="click"
      placement="topRight"
      className={styles.popover}
    >
      <button type="button" className={styles.attachFilesBtn}>
        <AttachIcon />
      </button>
    </Popover>
  );
};

export default ChatAttachFile;

import React from "react";
import { ReactComponent as DeleteIcon } from "../../../images/icons/trashRounded.svg";
import FileUploader from "../../shared/Uploaders/FileUploader/FileUploader";
import DocumentLink from "../../shared/DocumentLink/DocumentLink";
import styles from "./ChatInput.module.scss";

const AttachedFilesList = ({ files, addFile, removeFile }) => {
  return (
    <>
      {files && files?.length !== 0 && (
        <ul className={styles.attachedFilesList}>
          {files.map((file) => (
            <li key={file.file_path}>
              <DocumentLink
                file={{
                  file_name: file.file_name,
                  file_size: file.file_size,
                  file_type: file.file_type,
                }}
              />
              <button
                className={styles.deleteFileBtn}
                onClick={() => removeFile(file.file_path)}
              >
                <DeleteIcon />
              </button>
            </li>
          ))}
        </ul>
      )}
      <FileUploader
        className={styles.attachedFilesDropzone}
        type="chat-files"
        accept={{
          "image/*": [],
          "application/pdf": [],
          "application/msword": [],
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            [],
        }}
        renderDropZoneLabel={false}
        setUploadedFile={addFile}
        requestConfig={{ url: "/chat/upload/file", formDataKey: "file" }}
      />
    </>
  );
};

export default AttachedFilesList;

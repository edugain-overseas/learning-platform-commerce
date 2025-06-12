import React from "react";
import { ReactComponent as DocumentPDFIcon } from "../../../images/icons/doc-pdf.svg";
import { ReactComponent as DownloadFileIcon } from "../../../images/icons/download-file.svg";
import { formatFileSize } from "../../../utils/formatFileSize";
import { serverName } from "../../../http/server";
import styles from "./DocumentLink.module.scss";

const DocumentLink = ({ file }) => {
  const { file_name, file_size, file_path, filename } = file;
  return (
    <div className={styles.attachedDocumentWrapper}>
      <DocumentPDFIcon />
      <span className={styles.documentName}>{file_name || filename}</span>
      <span className={styles.documentSize}>{`(${formatFileSize(
        file_size
      )})`}</span>
      {file_path && (
        <a
          download={true}
          href={`${serverName}/${file_path}`}
          className={styles.downloadLink}
          rel="noreferrer noopener"
          target="_blank"
        >
          <DownloadFileIcon />
        </a>
      )}
    </div>
  );
};

export default DocumentLink;

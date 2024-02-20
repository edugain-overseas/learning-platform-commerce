import React from "react";
import { ReactComponent as DocumentPDFIcon } from "../../../images/icons/doc-pdf.svg";
import { ReactComponent as DownloadFileIcon } from "../../../images/icons/download-file.svg";
import styles from "./DocumentLink.module.scss";
import { formatFileSize } from "../../../utils/formatFileSize";
import { serverName } from "../../../http/sever";

const DocumentLink = ({ file }) => {
  const { filename, file_size, file_path } = file;
  return (
    <div className={styles.attachedDocumentWrapper}>
      <DocumentPDFIcon />
      <span className={styles.documentName}>{filename}</span>
      <span className={styles.documentSize}>{`(${formatFileSize(
        file_size
      )})`}</span>
      <a
        download={true}
        href={`${serverName}${file_path}`}
        className={styles.downloadLink}
        rel="noreferrer noopener"
        target="_blank"
      >
        <DownloadFileIcon />
      </a>
    </div>
  );
};

export default DocumentLink;
